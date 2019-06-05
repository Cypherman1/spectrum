// @flow
const debug = require('debug')(
  'hermes:queue:admin-slack-import-processed-email'
);
import Raven from 'shared/raven';
import sendEmail from '../send-email';
import {
  ADMIN_SLACK_IMPORT_PROCESSED_TEMPLATE,
  SEND_ADMIN_SLACK_IMPORT_PROCESSED_EMAIL,
} from './constants';
import type { Job, AdminSlackImportJobData } from 'shared/bull/types';

export default (job: Job<AdminSlackImportJobData>): Promise<void> => {
  debug(`\nnew job: ${job.id}`);
  const { user, community, invitedCount, teamName } = job.data;
  const subject = `New Slack import: ${invitedCount} invites from the ${teamName} Slack team`;
  const preheader = `${invitedCount} invites sent for the ${
    community.name
  } community`;
  try {
    return sendEmail({
      templateId: ADMIN_SLACK_IMPORT_PROCESSED_TEMPLATE,
      to: [
        { email: 'brian@ec2-18-224-212-70.us-east-2.compute.amazonaws.com ' },
        { email: 'max@ec2-18-224-212-70.us-east-2.compute.amazonaws.com ' },
        { email: 'bryn@ec2-18-224-212-70.us-east-2.compute.amazonaws.com ' },
      ],
      dynamic_template_data: {
        subject,
        preheader,
        data: {
          user,
          community,
          invitedCount,
          teamName,
        },
      },
    });
  } catch (err) {
    console.error('❌ Error in job:\n');
    console.error(err);
    return Raven.captureException(err);
  }
};
