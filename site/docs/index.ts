import * as configureLovit from './api/configure-lovit.mdx';
import * as createProfile from './api/create-profile.mdx';
import * as fetchLovit from './api/index.mdx';
import * as lovitError from './api/lovit-error.mdx';
import * as throwError from './api/throw-error.mdx';

import * as concepts from './guide/concepts.mdx';
import * as gettingStarted from './guide/index.mdx';
import * as usage from './guide/usage.mdx';
import * as whyLovit from './guide/why-lovit.mdx';

export const api = { fetchLovit, createProfile, configureLovit, throwError, lovitError };
export const guide = { whyLovit, gettingStarted, concepts, usage };
