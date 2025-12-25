export class Utils {
  // check one values
  public static isNull(value: any): boolean {
    if (value == undefined || value == null) {
      return true;
    } else if (typeof value === 'string') {
      return value.trim().length === 0;
    } else if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    } else if (typeof value === 'boolean') {
      return value ? false : true;
    }
  }

  // Check multiple values
  public static isAnythingNull(...value: any[]): boolean {
    return value.some((val) => Utils.isNull(val));
  }

  // Check array
  public static isNullOrEmptyArray(value: any[]): boolean {
    if (!Array.isArray(value)) {
      return true;
    } else if (value.length == 0) {
      return true;
    }
  }
}
