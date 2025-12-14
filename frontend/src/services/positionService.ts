import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3010';

export interface InterviewStep {
  id: number;
  interviewFlowId: number;
  interviewTypeId: number;
  name: string;
  orderIndex: number;
}

export interface InterviewFlow {
  id: number;
  description: string;
  interviewSteps: InterviewStep[];
}

export interface InterviewFlowResponse {
  positionName: string;
  interviewFlow: InterviewFlow;
}

export interface Candidate {
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
  id: number;
  applicationId: number;
}

/**
 * Obtiene el flujo de entrevistas de una posición
 * @param positionId ID de la posición
 * @returns Flujo de entrevistas con pasos ordenados
 */
export const getPositionInterviewFlow = async (positionId: number): Promise<InterviewFlowResponse> => {
  try {
    const response = await axios.get(`${API_URL}/position/${positionId}/interviewflow`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Posición no encontrada');
    }
    throw new Error(`Error al obtener el flujo de entrevistas: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Obtiene los candidatos de una posición
 * @param positionId ID de la posición
 * @returns Lista de candidatos con su fase actual y puntuación
 */
export const getPositionCandidates = async (positionId: number): Promise<Candidate[]> => {
  try {
    const response = await axios.get(`${API_URL}/position/${positionId}/candidates`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Posición no encontrada');
    }
    throw new Error(`Error al obtener los candidatos: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Actualiza la fase de un candidato
 * @param candidateId ID del candidato
 * @param applicationId ID de la aplicación
 * @param currentInterviewStep ID de la nueva fase de entrevista
 * @returns Datos actualizados del candidato
 */
export const updateCandidateStage = async (
  candidateId: number,
  applicationId: number,
  currentInterviewStep: number
): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}/candidates/${candidateId}`, {
      applicationId,
      currentInterviewStep
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al actualizar la fase del candidato: ${error.response?.data?.message || error.message}`);
  }
};

