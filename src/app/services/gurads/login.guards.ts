import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { CommonHelperService } from "../../utils/helpers/common-helper.service";
import { APP } from "../../utils/constants/APP.const";

export const LoginGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const sessionObj = inject(CommonHelperService).getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    if(!sessionObj || !sessionObj.token) {
        return true;
    } else {
        if(sessionObj?.userDetail?.role?.toLocaleLowerCase() === 'banker') {
            router.navigate([APP.ROUTES.MY_LEADS]);
        } else if(sessionObj?.userDetail?.role?.toLocaleLowerCase() === 'sales-executive') {
            router.navigate([APP.ROUTES.ORDER]);
        } else {
            router.navigate([APP.ROUTES.LOAN_APPLICATION_STATUS]);
        }
        return false;
    }
}
