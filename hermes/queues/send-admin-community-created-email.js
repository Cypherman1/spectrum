// @flow
const debug = require('debug')('hermes:queue:admin-community-created-email');
import Raven from 'shared/raven';
import sendEmail from '../send-email';
import type { Job, AdminCommunityCreatedEmailJobData } from 'shared/bull/types';
import {
  ADMIN_COMMUNITY_CREATED_TEMPLATE,
  SEND_ADMIN_COMMUNITY_CREATED_EMAIL,
} from './constants';

export default (job: Job<AdminCommunityCreatedEmailJobData>): Promise<void> => {
  debug(`\nnew job: ${job.id}`);
  const { user, community } = job.data;

  try {
    return sendEmail({
      templateId: ADMIN_COMMUNITY_CREATED_TEMPLATE,
      to: [
        { email: 'brian@ec2-18-224-212-70.us-east-2.compute.amazonaws.com ' },
        { email: 'max@ec2-18-224-212-70.us-east-2.compute.amazonaws.com ' },
        { email: 'bryn@ec2-18-224-212-70.us-east-2.compute.amazonaws.com ' },
      ],
      dynamic_template_data: {
        subject: `New community: ${community.name}`,
        user: {
          ...user,
          createdAt: new Date(user.createdAt),
        },
        community,
      },
    });
  } catch (err) {
    console.error('❌ Error in job:\n');
    console.error(err);
    return Raven.captureException(err);
  }
};
