import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from 'aws-lambda'
import { baseHelloHandler } from '@/handlers/base/BaseHello'
import { awsToBaseContext, awsToBaseEvent, baseToAwsResult } from '@/handlers/base/TypeConverters'

export const awsHelloHandler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> => {
    return baseHelloHandler(awsToBaseEvent(event), awsToBaseContext(context)).then(result => baseToAwsResult(result))
}
