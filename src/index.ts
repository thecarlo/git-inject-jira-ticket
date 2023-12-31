#!/usr/bin/env node

import { injectJiraTicket } from '@functions/injectJiraTicket';

(async () => {
  await injectJiraTicket();
})();
