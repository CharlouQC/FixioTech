import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Hook personnalisé pour gérer la navigation conditionnelle selon le rôle
 */
export const useRoleNavigation = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  /**
   * Navigation vers la page de prise de rendez-vous
   * - Employé → tableau de bord employé
   * - Client authentifié → page de rendez-vous
   * - Non authentifié → inscription
   */
  const navigateToBooking = () => {
    if (role === 'employe') {
      navigate('/employe');
    } else if (isAuthenticated) {
      navigate('/rendez-vous');
    } else {
      navigate('/inscription');
    }
  };

  /**
   * Navigation secondaire
   * - Employé → horaires
   * - Autres → services et aides
   */
  const navigateToSecondary = () => {
    if (role === 'employe') {
      navigate('/horaires');
    } else {
      navigate('/services_aides');
    }
  };

  return {
    navigateToBooking,
    navigateToSecondary,
    isAuthenticated,
    role,
  };
};
