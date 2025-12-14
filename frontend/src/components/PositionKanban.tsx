import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  getPositionInterviewFlow,
  getPositionCandidates,
  updateCandidateStage,
  InterviewStep,
  Candidate,
  InterviewFlowResponse
} from '../services/positionService';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: candidate.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const formatScore = (score: number | null | undefined): string => {
    if (score === null || score === undefined) {
      return 'N/A';
    }
    return score.toFixed(1);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 shadow-sm"
    >
      <Card.Body>
        <Card.Title className="h6">{candidate.fullName}</Card.Title>
        <Card.Text className="mb-0">
          <strong>Puntuación:</strong> {formatScore(candidate.averageScore)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

interface DroppableColumnProps {
  step: InterviewStep;
  candidates: Candidate[];
  onCandidateClick?: (candidate: Candidate) => void;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ step, candidates }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: step.name
  });

  const stepCandidates = candidates.filter(
    (candidate) => candidate.currentInterviewStep === step.name
  );

  return (
    <Col xs={12} md={6} lg={3} className="mb-4">
      <Card
        ref={setNodeRef}
        className="h-100"
        style={{
          backgroundColor: isOver ? '#e3f2fd' : undefined
        }}
      >
        <Card.Header className="bg-primary text-white">
          <Card.Title className="h6 mb-0">{step.name}</Card.Title>
        </Card.Header>
        <Card.Body style={{ minHeight: '200px' }}>
          <SortableContext
            items={stepCandidates.map((c) => c.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            {stepCandidates.length === 0 ? (
              <p className="text-muted text-center mb-0">No hay candidatos</p>
            ) : (
              stepCandidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))
            )}
          </SortableContext>
        </Card.Body>
      </Card>
    </Col>
  );
};

const PositionKanban: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const positionId = id ? parseInt(id, 10) : 0;

  const [positionName, setPositionName] = useState<string>('');
  const [interviewSteps, setInterviewSteps] = useState<InterviewStep[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  useEffect(() => {
    const loadData = async () => {
      if (!positionId || isNaN(positionId)) {
        setError('ID de posición inválido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [flowData, candidatesData] = await Promise.all([
          getPositionInterviewFlow(positionId),
          getPositionCandidates(positionId)
        ]);

        setPositionName(flowData.positionName);
        
        if (!flowData.interviewFlow || !flowData.interviewFlow.interviewSteps) {
          throw new Error('El flujo de entrevistas no está configurado para esta posición');
        }
        
        const sortedSteps = [...flowData.interviewFlow.interviewSteps].sort(
          (a, b) => a.orderIndex - b.orderIndex
        );
        setInterviewSteps(sortedSteps);
        setCandidates(candidatesData);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [positionId]);

  const findStepIdByName = (stepName: string): number | null => {
    const step = interviewSteps.find((s) => s.name === stepName);
    return step ? step.id : null;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) {
      return;
    }

    const candidateId = parseInt(active.id.toString(), 10);
    const candidate = candidates.find((c) => c.id === candidateId);
    if (!candidate) {
      return;
    }

    // Si se suelta en la misma columna, no hacer nada
    if (candidate.currentInterviewStep === over.id.toString()) {
      return;
    }

    const targetStepName = over.id.toString();
    const targetStepId = findStepIdByName(targetStepName);

    if (!targetStepId) {
      return;
    }

    const originalCandidates = [...candidates];

    try {
      setUpdating(true);
      setError(null);

      await updateCandidateStage(
        candidateId,
        candidate.applicationId,
        targetStepId
      );

      const updatedCandidates = candidates.map((c) =>
        c.id === candidateId
          ? { ...c, currentInterviewStep: targetStepName }
          : c
      );
      setCandidates(updatedCandidates);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la fase del candidato');
      setCandidates(originalCandidates);
    } finally {
      setUpdating(false);
    }
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id.toString());
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error && !candidates.length) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <div className="d-flex align-items-center">
            <ArrowLeft
              className="me-3"
              style={{ cursor: 'pointer', fontSize: '1.5rem' }}
              onClick={() => navigate('/positions')}
              aria-label="Volver a posiciones"
            />
            <h2>{positionName || 'Cargando...'}</h2>
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Row>
          {interviewSteps.length === 0 ? (
            <Col>
              <Alert variant="warning">
                No hay fases de entrevista configuradas para esta posición.
              </Alert>
            </Col>
          ) : (
            interviewSteps.map((step) => (
              <DroppableColumn
                key={step.id}
                step={step}
                candidates={candidates}
              />
            ))
          )}
        </Row>
        <DragOverlay>
          {activeId ? (
            <Card style={{ opacity: 0.5 }}>
              <Card.Body>
                <Card.Title className="h6">
                  {candidates.find((c) => c.id.toString() === activeId)?.fullName}
                </Card.Title>
              </Card.Body>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>

      {updating && (
        <div className="position-fixed bottom-0 end-0 p-3">
          <Alert variant="info" className="mb-0">
            <Spinner size="sm" className="me-2" />
            Actualizando fase...
          </Alert>
        </div>
      )}
    </Container>
  );
};

export default PositionKanban;

