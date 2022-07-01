import { useAuth } from "../contexts/AuthContext";
import { validateUserPermissions } from "../utils/validateUserPermissions";

interface useCanProps {
    permissions?: string[];
    roles?: string[];
}

export function useCan({permissions, roles}: useCanProps){
    const {user} = useAuth();
    
    const userHasValidPermissions = validateUserPermissions({user, permissions, roles});
    
    return userHasValidPermissions;
}