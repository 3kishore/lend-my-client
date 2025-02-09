import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { APP } from "../../utils/constants/APP.const";
import { CommonHelperService } from "../../utils/helpers/common-helper.service";

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const sessionObj = inject(CommonHelperService).getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    console.log(sessionObj)
    if(sessionObj && sessionObj.token) {
        return true;
    } else {
        router.navigate([APP.ROUTES.LOGIN])
        return false;
    }
}
