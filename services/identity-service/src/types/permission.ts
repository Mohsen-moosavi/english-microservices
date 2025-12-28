export type Action = "INSERT" | "UPDATE" | "DELETE" | "GET";
export type Resource =
    "USER"  | "COURSE"  | "COMMENT" | "ARTICLE" |
    "BOOK"  | "CONTACT" | "FILE"    | "OFF"     |
    "ROLE"  | "SALE"    | "SESSION" | "TAG"     |
    "TICKET";

export type  appPermission = `${Resource}:${Action}`



