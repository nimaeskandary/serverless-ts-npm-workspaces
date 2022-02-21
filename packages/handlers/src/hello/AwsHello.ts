import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from 'aws-lambda'
import { helloHandler } from './Hello'
import { awsToBaseContext, awsToBaseEvent, baseToAwsResult } from '@serverless-ts-npm-workspaces/handler-converters'

export const awsHelloHandler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> => {
    return helloHandler(awsToBaseEvent(event), awsToBaseContext(context)).then(result => baseToAwsResult(result))
}
