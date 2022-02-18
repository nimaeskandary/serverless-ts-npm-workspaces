export type BaseHandlerEvent = {
    body?: string,
    queryStrings?: { [name: string]: string | undefined },
    cookies?: string[]
    headers: { [name: string]: string | undefined },
    pathParameters?: { [name: string]: string | undefined }
}

export type BaseHandlerContext = {
    
}

export type BaseHandlerResult = {
    statusCode: number,
    headers?: { [header: string]: boolean | number | string },
    body?: string | undefined,
    cookies?: string[] | undefined
}
