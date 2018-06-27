import {AbstractControl} from "@angular/forms";

export function ValidateVideoUrl(control: AbstractControl) {
  if (control.value) {
    const httpProtocol = control.value.split('/')[0];
    const domain = control.value.split('/')[2];
    if (httpProtocol === 'https:' && domain === 'www.youtube.com') {
      return null
    }
  }

  return {validUrl: true}

}
