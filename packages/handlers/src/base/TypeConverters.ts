import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from 'aws-lambda'
import { BaseHandlerContext, BaseHandlerEvent, BaseHandlerResult } from '@/handlers/types'

export const awsToBaseEvent = (event: APIGatewayProxyEventV2): BaseHandlerEvent => {
    return {
        body: event.body,
        cookies: event.cookies,
        queryStrings: event.queryStringParameters,
        headers: event.headers,
        pathParameters: event.pathParameters
    }
}

export const awsToBaseContext = (context: Context): BaseHandlerContext => {
    return {}
}

export const baseToAwsResult = (result: BaseHandlerResult): APIGatewayProxyResultV2 => {
    return {
        statusCode: result.statusCode,
        headers: result.headers,
        body: result.body,
        cookies: result.cookies
    }
}