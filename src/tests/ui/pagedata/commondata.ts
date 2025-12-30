import { currentTime } from '../../../utils/util';
import { randomNumber } from '../../../utils/util';

export const loginData = {
  headerText: 'Sign in to your account',
  email: 'Sandeep.kumar@superwit.org',
  password: 'Reemare1!',
};
export const inValidLoginData = {
  email: 'test@yopmail.com',
  password: 'Test@123',
};
export const url = {
  inboxURL: 'https://app.whippy.co/inbox/all/open',
  loginURL: 'https://app.whippy.co/login',
  contactsURL: 'https://app.whippy.co/contacts',
};
export const InboxPageData = {
  headerText: 'Inbox',
  senderPhoneNumber: '2345' + randomNumber,
  senderName: 'Test' + currentTime,
  smsDescription: 'Hello Automation',
  addTemplateHeader: 'Create a Template',
  templateName: 'Template' + currentTime,
  templateMessage: 'Test Template ' + currentTime,
  updateTemplate: 'Update Template' + currentTime,
};

export const CONTACT_DATA = {
  fullName: 'cn' + currentTime,
  phoneNumber: '(256) 269-0950',
  email: 'contactemail' + '@yopmail.com',
};

export const randomMessage = 'Test Message ' + currentTime;

export const CONTACT_UPLOAD_DATA = {
  uploadName: 'Test Upload',
  contacts: ['Test1 User1', 'Test2 User2', 'Test3 User3'],
  uploadNameForAudience: 'Test' + currentTime,
};

export const CAMPAIGNS_DATA = {
  campaignsName: 'Campaigns' + currentTime,
  campaignsPhoneNumber: '8041234567',
  campaignsAudience: 'Test',
  campaignsExclude: 'TestWhippy',
  campaignsMessage: 'Hello Campaigns Message',
  campaignLinkMessage: 'TEST Triggers',
  updatedCampaignsName: 'UpdatedCampaigns' + currentTime,
};

export const ALL_SEQUENCES_DATA = {
  headerText: 'All Sequences',
  title: 'Sequences' + currentTime,
  description: 'Description' + currentTime,
  stepTitle: 'Step' + currentTime,
  message: 'Test Message ' + currentTime,
  updatedTitle: 'Updated Sequences ' + currentTime,
  updatedDescription: 'Updated description ' + currentTime,
};
