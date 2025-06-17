import type { RouteHandle } from 'react-router';
import { data } from 'react-router';

import type { Route } from './+types/$id.download';

import { getLetterService } from '~/.server/domain/services/letter.service';
import { requireAuth } from '~/.server/utils/auth-utils';
import { AppError } from '~/errors/app-error';
import { ErrorCodes } from '~/errors/error-codes';
import { handle as parentHandle } from '~/routes/layout';

export const handle = {
  i18nNamespace: [...parentHandle.i18nNamespace],
} as const satisfies RouteHandle;

export async function loader({ context, params, request }: Route.LoaderArgs) {
  const { userinfoTokenClaims } = await requireAuth(context.session, request);

  if (!params.id) {
    throw data(null, { status: 400 });
  }

  if (!userinfoTokenClaims.sin) {
    throw new AppError('No SIN found in userinfo token', ErrorCodes.AUTH_USERINFO_FETCH_ERROR);
  }
  const user = userinfoTokenClaims.sin;

  const pdfBytes = await getLetterService().getPdfByLetterId({ letterId: params.id, userId: user });

  const decodedPdfBytes = Buffer.from(pdfBytes, 'base64');
  return new Response(decodedPdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': decodedPdfBytes.length.toString(),
      'Content-Disposition': `inline; filename="${params.id}.pdf"`,
    },
  });
}
