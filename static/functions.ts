export function sendResponse(status: number, text: string|null = null ): Response {
    if (status === 200) {
      return new Response( text ? text : 'OK', {status: status} );
    } else if (status === 400) {
      return new Response( text ? text : 'Bad Request', {status: status} );
    } else if (status === 404) {
      return new Response( text ? text : 'Not Found', {status: status} );
    } else if (status === 500) {
      return new Response( text ? text : 'Unknown', {status: status} );
    } else {
      return new Response( text ? text : 'Unknown', {status: 500} );
    }
  }
  