export function isString(maybeString: any): maybeString is string {
    return typeof maybeString === "string";
}