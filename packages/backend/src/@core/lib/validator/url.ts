import { UrlValidator as IUrlValidator } from '../../../presentation/protocols/url-validator'
import validator from 'validator'

export class UrlValidator implements IUrlValidator {
  validate(url: string): boolean {
    return validator.isURL(url)
  }
}
