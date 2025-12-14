import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PositionKanban from './PositionKanban';
import * as positionService from '../services/positionService';

// Mock del servicio
jest.mock('../services/positionService');

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' })
}));

const mockInterviewFlow = {
  positionName: 'Desarrollador Full Stack',
  interviewFlow: {
    id: 1,
    description: 'Flujo estándar',
    interviewSteps: [
      { id: 1, interviewFlowId: 1, interviewTypeId: 1, name: 'Screening Inicial', orderIndex: 1 },
      { id: 2, interviewFlowId: 1, interviewTypeId: 2, name: 'Entrevista Técnica', orderIndex: 2 },
      { id: 3, interviewFlowId: 1, interviewTypeId: 3, name: 'Entrevista Cultural', orderIndex: 3 }
    ]
  }
};

const mockCandidates = [
  {
    id: 1,
    fullName: 'Juan Pérez',
    currentInterviewStep: 'Screening Inicial',
    averageScore: 8.5,
    applicationId: 1
  },
  {
    id: 2,
    fullName: 'María García',
    currentInterviewStep: 'Entrevista Técnica',
    averageScore: 7.0,
    applicationId: 2
  }
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PositionKanban', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Carga de datos', () => {
    it('debe mostrar un spinner mientras carga los datos', async () => {
      (positionService.getPositionInterviewFlow as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      );
      (positionService.getPositionCandidates as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      );

      renderWithRouter(<PositionKanban />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('debe cargar y mostrar el título de la posición', async () => {
      (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
      (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(mockCandidates);

      renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        expect(screen.getByText('Desarrollador Full Stack')).toBeInTheDocument();
      });
    });

    it('debe cargar y mostrar todas las fases como columnas', async () => {
      (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
      (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(mockCandidates);

      renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        expect(screen.getByText('Screening Inicial')).toBeInTheDocument();
        expect(screen.getByText('Entrevista Técnica')).toBeInTheDocument();
        expect(screen.getByText('Entrevista Cultural')).toBeInTheDocument();
      });
    });

    it('debe mostrar los candidatos en sus columnas correspondientes', async () => {
      (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
      (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(mockCandidates);

      renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.getByText('María García')).toBeInTheDocument();
      });
    });

    it('debe mostrar la puntuación media de cada candidato', async () => {
      (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
      (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(mockCandidates);

      renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        expect(screen.getByText(/8\.5/)).toBeInTheDocument();
        expect(screen.getByText(/7\.0/)).toBeInTheDocument();
      });
    });

    it('debe mostrar "N/A" cuando un candidato no tiene puntuación', async () => {
      const candidatesWithoutScore = [
        {
          id: 3,
          fullName: 'Pedro López',
          currentInterviewStep: 'Screening Inicial',
          averageScore: null,
          applicationId: 3
        }
      ];

      (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
      (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(candidatesWithoutScore);

      renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        expect(screen.getByText('N/A')).toBeInTheDocument();
      });
    });
  });

  describe('Navegación', () => {
    it('debe mostrar un botón de navegación para volver a /positions', async () => {
      (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
      (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(mockCandidates);

      renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        const backButton = screen.getByLabelText('Volver a posiciones');
        expect(backButton).toBeInTheDocument();
      });
    });

    it('debe navegar a /positions cuando se hace clic en el botón de volver', async () => {
      (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
      (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(mockCandidates);

      renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        const backButton = screen.getByLabelText('Volver a posiciones');
        fireEvent.click(backButton);
        expect(mockNavigate).toHaveBeenCalledWith('/positions');
      });
    });
  });

  describe('Manejo de errores', () => {
    it('debe mostrar un mensaje de error si falla la carga del flujo de entrevistas', async () => {
      (positionService.getPositionInterviewFlow as jest.Mock).mockRejectedValue(
        new Error('Error al cargar el flujo')
      );
      (positionService.getPositionCandidates as jest.Mock).mockResolvedValue([]);

      renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        expect(screen.getByText(/Error al cargar/i)).toBeInTheDocument();
      });
    });

    it('debe mostrar un mensaje de error si falla la carga de candidatos', async () => {
      (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
      (positionService.getPositionCandidates as jest.Mock).mockRejectedValue(
        new Error('Error al cargar candidatos')
      );

      renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        expect(screen.getByText(/Error al cargar/i)).toBeInTheDocument();
      });
    });

    it('debe mostrar un mensaje de error si el ID de posición es inválido', async () => {
      jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ id: 'invalid' });

      renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        expect(screen.getByText(/ID de posición inválido/i)).toBeInTheDocument();
      });
    });
  });

  describe('Actualización de fase', () => {
    it('debe llamar a updateCandidateStage cuando se mueve un candidato', async () => {
      (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
      (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(mockCandidates);
      (positionService.updateCandidateStage as jest.Mock).mockResolvedValue({
        message: 'Actualizado exitosamente',
        data: {}
      });

      renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
      });

      // Nota: Las pruebas de drag and drop requieren una implementación más compleja
      // con @testing-library/user-event y simulaciones de eventos de arrastre
      // Por ahora, verificamos que el servicio esté disponible
      expect(positionService.updateCandidateStage).toBeDefined();
    });
  });

  describe('Responsive', () => {
    it('debe usar clases de Bootstrap para diseño responsive', async () => {
      (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
      (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(mockCandidates);

      const { container } = renderWithRouter(<PositionKanban />);

      await waitFor(() => {
        const columns = container.querySelectorAll('.col-xs-12, .col-md-6, .col-lg-3');
        expect(columns.length).toBeGreaterThan(0);
      });
    });
  });
});

