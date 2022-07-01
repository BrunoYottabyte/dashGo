type User = {
    permissions: string[];
    roles: string[];
}

interface ValidateUserPermissionsProps {
    user: User;
    permissions?: string[];
    roles?: string[];
}

export function validateUserPermissions({user, permissions, roles}: ValidateUserPermissionsProps){
    
    if(permissions.length > 0){
        const hasPermission = permissions.every(permission => user?.permissions.includes(permission));
        if(!hasPermission) return false;
    }

    if(roles.length > 0){
        const hasRoles = roles.some(role => user?.roles.includes(role));
        if(!hasRoles) return false;
    }

    return true;
}