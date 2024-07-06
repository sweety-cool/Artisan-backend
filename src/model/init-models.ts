import type { Sequelize } from "sequelize";
import { admin_apprv_imgs as _admin_apprv_imgs } from "./admin_apprv_imgs";
import type { admin_apprv_imgsAttributes, admin_apprv_imgsCreationAttributes } from "./admin_apprv_imgs";
import { admin_site as _admin_site } from "./admin_site";
import type { admin_siteAttributes, admin_siteCreationAttributes } from "./admin_site";
import { admins as _admins } from "./admins";
import type { adminsAttributes, adminsCreationAttributes } from "./admins";
import { affiliate_archive as _affiliate_archive } from "./affiliate_archive";
import type { affiliate_archiveAttributes, affiliate_archiveCreationAttributes } from "./affiliate_archive";
import { affiliate_payment as _affiliate_payment } from "./affiliate_payment";
import type { affiliate_paymentAttributes, affiliate_paymentCreationAttributes } from "./affiliate_payment";
import { affiliate_questions as _affiliate_questions } from "./affiliate_questions";
import type { affiliate_questionsAttributes, affiliate_questionsCreationAttributes } from "./affiliate_questions";
import { affiliate_released_payments as _affiliate_released_payments } from "./affiliate_released_payments";
import type { affiliate_released_paymentsAttributes, affiliate_released_paymentsCreationAttributes } from "./affiliate_released_payments";
import { affiliate_unreleased_payments as _affiliate_unreleased_payments } from "./affiliate_unreleased_payments";
import type { affiliate_unreleased_paymentsAttributes, affiliate_unreleased_paymentsCreationAttributes } from "./affiliate_unreleased_payments";
import { affiliate_welcome_msg as _affiliate_welcome_msg } from "./affiliate_welcome_msg";
import type { affiliate_welcome_msgAttributes, affiliate_welcome_msgCreationAttributes } from "./affiliate_welcome_msg";
import { bans as _bans } from "./bans";
import type { bansAttributes, bansCreationAttributes } from "./bans";
import { bid_relation as _bid_relation } from "./bid_relation";
import type { bid_relationAttributes, bid_relationCreationAttributes } from "./bid_relation";
import { bids as _bids } from "./bids";
import type { bidsAttributes, bidsCreationAttributes } from "./bids";
import { bookmark as _bookmark } from "./bookmark";
import type { bookmarkAttributes, bookmarkCreationAttributes } from "./bookmark";
import { categories as _categories } from "./categories";
import type { categoriesAttributes, categoriesCreationAttributes } from "./categories";
import { clickthroughs as _clickthroughs } from "./clickthroughs";
import type { clickthroughsAttributes, clickthroughsCreationAttributes } from "./clickthroughs";
import { commission_rate as _commission_rate } from "./commission_rate";
import type { commission_rateAttributes, commission_rateCreationAttributes } from "./commission_rate";
import { contacts as _contacts } from "./contacts";
import type { contactsAttributes, contactsCreationAttributes } from "./contacts";
import { country as _country } from "./country";
import type { countryAttributes, countryCreationAttributes } from "./country";
import { country_master as _country_master } from "./country_master";
import type { country_masterAttributes, country_masterCreationAttributes } from "./country_master";
import { country_master_new as _country_master_new } from "./country_master_new";
import type { country_master_newAttributes, country_master_newCreationAttributes } from "./country_master_new";
import { current_commission_rate as _current_commission_rate } from "./current_commission_rate";
import type { current_commission_rateAttributes, current_commission_rateCreationAttributes } from "./current_commission_rate";
import { customer_job_page as _customer_job_page } from "./customer_job_page";
import type { customer_job_pageAttributes, customer_job_pageCreationAttributes } from "./customer_job_page";
import { delivery_contacts as _delivery_contacts } from "./delivery_contacts";
import type { delivery_contactsAttributes, delivery_contactsCreationAttributes } from "./delivery_contacts";
import { dispute_agree as _dispute_agree } from "./dispute_agree";
import type { dispute_agreeAttributes, dispute_agreeCreationAttributes } from "./dispute_agree";
import { draftprojects as _draftprojects } from "./draftprojects";
import type { draftprojectsAttributes, draftprojectsCreationAttributes } from "./draftprojects";
import { email_templates as _email_templates } from "./email_templates";
import type { email_templatesAttributes, email_templatesCreationAttributes } from "./email_templates";
import { escrow_release_request as _escrow_release_request } from "./escrow_release_request";
import type { escrow_release_requestAttributes, escrow_release_requestCreationAttributes } from "./escrow_release_request";
import { euro_to_gbp as _euro_to_gbp } from "./euro_to_gbp";
import type { euro_to_gbpAttributes, euro_to_gbpCreationAttributes } from "./euro_to_gbp";
import { faq_categories as _faq_categories } from "./faq_categories";
import type { faq_categoriesAttributes, faq_categoriesCreationAttributes } from "./faq_categories";
import { faqs as _faqs } from "./faqs";
import type { faqsAttributes, faqsCreationAttributes } from "./faqs";
import { files as _files } from "./files";
import type { filesAttributes, filesCreationAttributes } from "./files";
import { footer_text as _footer_text } from "./footer_text";
import type { footer_textAttributes, footer_textCreationAttributes } from "./footer_text";
import { gbp_rate_history as _gbp_rate_history } from "./gbp_rate_history";
import type { gbp_rate_historyAttributes, gbp_rate_historyCreationAttributes } from "./gbp_rate_history";
import { groups as _groups } from "./groups";
import type { groupsAttributes, groupsCreationAttributes } from "./groups";
import { invoices as _invoices } from "./invoices";
import type { invoicesAttributes, invoicesCreationAttributes } from "./invoices";
import { invoicesdue as _invoicesdue } from "./invoicesdue";
import type { invoicesdueAttributes, invoicesdueCreationAttributes } from "./invoicesdue";
import { ipn_return as _ipn_return } from "./ipn_return";
import type { ipn_returnAttributes, ipn_returnCreationAttributes } from "./ipn_return";
import { job_list_manage as _job_list_manage } from "./job_list_manage";
import type { job_list_manageAttributes, job_list_manageCreationAttributes } from "./job_list_manage";
import { login_info as _login_info } from "./login_info";
import type { login_infoAttributes, login_infoCreationAttributes } from "./login_info";
import { message_dialog as _message_dialog } from "./message_dialog";
import type { message_dialogAttributes, message_dialogCreationAttributes } from "./message_dialog";
import { message_relation as _message_relation } from "./message_relation";
import type { message_relationAttributes, message_relationCreationAttributes } from "./message_relation";
import { messages as _messages } from "./messages";
import type { messagesAttributes, messagesCreationAttributes } from "./messages";
import { msg_dialog_relation as _msg_dialog_relation } from "./msg_dialog_relation";
import type { msg_dialog_relationAttributes, msg_dialog_relationCreationAttributes } from "./msg_dialog_relation";
import { mytable as _mytable } from "./mytable";
import type { mytableAttributes, mytableCreationAttributes } from "./mytable";
import { notif_email_list as _notif_email_list } from "./notif_email_list";
import type { notif_email_listAttributes, notif_email_listCreationAttributes } from "./notif_email_list";
import { packages as _packages } from "./packages";
import type { packagesAttributes, packagesCreationAttributes } from "./packages";
import { page as _page } from "./page";
import type { pageAttributes, pageCreationAttributes } from "./page";
import { page_details as _page_details } from "./page_details";
import type { page_detailsAttributes, page_detailsCreationAttributes } from "./page_details";
import { page_it as _page_it } from "./page_it";
import type { page_itAttributes, page_itCreationAttributes } from "./page_it";
import { page_uk as _page_uk } from "./page_uk";
import type { page_ukAttributes, page_ukCreationAttributes } from "./page_uk";
import { particular_job_manage as _particular_job_manage } from "./particular_job_manage";
import type { particular_job_manageAttributes, particular_job_manageCreationAttributes } from "./particular_job_manage";
import { payments as _payments } from "./payments";
import type { paymentsAttributes, paymentsCreationAttributes } from "./payments";
import { popular_search as _popular_search } from "./popular_search";
import type { popular_searchAttributes, popular_searchCreationAttributes } from "./popular_search";
import { portfolio as _portfolio } from "./portfolio";
import type { portfolioAttributes, portfolioCreationAttributes } from "./portfolio";
import { prebid_message_relation as _prebid_message_relation } from "./prebid_message_relation";
import type { prebid_message_relationAttributes, prebid_message_relationCreationAttributes } from "./prebid_message_relation";
import { prebid_messages as _prebid_messages } from "./prebid_messages";
import type { prebid_messagesAttributes, prebid_messagesCreationAttributes } from "./prebid_messages";
import { project_cases as _project_cases } from "./project_cases";
import type { project_casesAttributes, project_casesCreationAttributes } from "./project_cases";
import { project_description_relation as _project_description_relation } from "./project_description_relation";
import type { project_description_relationAttributes, project_description_relationCreationAttributes } from "./project_description_relation";
import { project_descriptions as _project_descriptions } from "./project_descriptions";
import type { project_descriptionsAttributes, project_descriptionsCreationAttributes } from "./project_descriptions";
import { project_images as _project_images } from "./project_images";
import type { project_imagesAttributes, project_imagesCreationAttributes } from "./project_images";
import { project_invitation as _project_invitation } from "./project_invitation";
import type { project_invitationAttributes, project_invitationCreationAttributes } from "./project_invitation";
import { project_relation as _project_relation } from "./project_relation";
import type { project_relationAttributes, project_relationCreationAttributes } from "./project_relation";
import { project_topics as _project_topics } from "./project_topics";
import type { project_topicsAttributes, project_topicsCreationAttributes } from "./project_topics";
import { projects as _projects } from "./projects";
import type { projectsAttributes, projectsCreationAttributes } from "./projects";
import { projects_preview as _projects_preview } from "./projects_preview";
import type { projects_previewAttributes, projects_previewCreationAttributes } from "./projects_preview";
import { projects_temp as _projects_temp } from "./projects_temp";
import type { projects_tempAttributes, projects_tempCreationAttributes } from "./projects_temp";
import { rating_hold as _rating_hold } from "./rating_hold";
import type { rating_holdAttributes, rating_holdCreationAttributes } from "./rating_hold";
import { rejected_domains as _rejected_domains } from "./rejected_domains";
import type { rejected_domainsAttributes, rejected_domainsCreationAttributes } from "./rejected_domains";
import { report_violation as _report_violation } from "./report_violation";
import type { report_violationAttributes, report_violationCreationAttributes } from "./report_violation";
import { review_relation as _review_relation } from "./review_relation";
import type { review_relationAttributes, review_relationCreationAttributes } from "./review_relation";
import { reviews as _reviews } from "./reviews";
import type { reviewsAttributes, reviewsCreationAttributes } from "./reviews";
import { roles as _roles } from "./roles";
import type { rolesAttributes, rolesCreationAttributes } from "./roles";
import { sales as _sales } from "./sales";
import type { salesAttributes, salesCreationAttributes } from "./sales";
import { sessions as _sessions } from "./sessions";
import type { sessionsAttributes, sessionsCreationAttributes } from "./sessions";
import { settings as _settings } from "./settings";
import type { settingsAttributes, settingsCreationAttributes } from "./settings";
import { settings_it as _settings_it } from "./settings_it";
import type { settings_itAttributes, settings_itCreationAttributes } from "./settings_it";
import { settings_uk as _settings_uk } from "./settings_uk";
import type { settings_ukAttributes, settings_ukCreationAttributes } from "./settings_uk";
import { steps_completed_by_customer as _steps_completed_by_customer } from "./steps_completed_by_customer";
import type { steps_completed_by_customerAttributes, steps_completed_by_customerCreationAttributes } from "./steps_completed_by_customer";
import { steps_completed_by_supplier as _steps_completed_by_supplier } from "./steps_completed_by_supplier";
import type { steps_completed_by_supplierAttributes, steps_completed_by_supplierCreationAttributes } from "./steps_completed_by_supplier";
import { subscriptionuser as _subscriptionuser } from "./subscriptionuser";
import type { subscriptionuserAttributes, subscriptionuserCreationAttributes } from "./subscriptionuser";
import { supplier_job_page as _supplier_job_page } from "./supplier_job_page";
import type { supplier_job_pageAttributes, supplier_job_pageCreationAttributes } from "./supplier_job_page";
import { supplier_steps as _supplier_steps } from "./supplier_steps";
import type { supplier_stepsAttributes, supplier_stepsCreationAttributes } from "./supplier_steps";
import { support as _support } from "./support";
import type { supportAttributes, supportCreationAttributes } from "./support";
import { suspend as _suspend } from "./suspend";
import type { suspendAttributes, suspendCreationAttributes } from "./suspend";
import { test_table as _test_table } from "./test_table";
import type { test_tableAttributes, test_tableCreationAttributes } from "./test_table";
import { testimonials as _testimonials } from "./testimonials";
import type { testimonialsAttributes, testimonialsCreationAttributes } from "./testimonials";
import { transactions as _transactions } from "./transactions";
import type { transactionsAttributes, transactionsCreationAttributes } from "./transactions";
import { user_balance as _user_balance } from "./user_balance";
import type { user_balanceAttributes, user_balanceCreationAttributes } from "./user_balance";
import { user_categories as _user_categories } from "./user_categories";
import type { user_categoriesAttributes, user_categoriesCreationAttributes } from "./user_categories";
import { user_contacts as _user_contacts } from "./user_contacts";
import type { user_contactsAttributes, user_contactsCreationAttributes } from "./user_contacts";
import { user_list as _user_list } from "./user_list";
import type { user_listAttributes, user_listCreationAttributes } from "./user_list";
import { user_relation as _user_relation } from "./user_relation";
import type { user_relationAttributes, user_relationCreationAttributes } from "./user_relation";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _admin_apprv_imgs as admin_apprv_imgs,
  _admin_site as admin_site,
  _admins as admins,
  _affiliate_archive as affiliate_archive,
  _affiliate_payment as affiliate_payment,
  _affiliate_questions as affiliate_questions,
  _affiliate_released_payments as affiliate_released_payments,
  _affiliate_unreleased_payments as affiliate_unreleased_payments,
  _affiliate_welcome_msg as affiliate_welcome_msg,
  _bans as bans,
  _bid_relation as bid_relation,
  _bids as bids,
  _bookmark as bookmark,
  _categories as categories,
  _clickthroughs as clickthroughs,
  _commission_rate as commission_rate,
  _contacts as contacts,
  _country as country,
  _country_master as country_master,
  _country_master_new as country_master_new,
  _current_commission_rate as current_commission_rate,
  _customer_job_page as customer_job_page,
  _delivery_contacts as delivery_contacts,
  _dispute_agree as dispute_agree,
  _draftprojects as draftprojects,
  _email_templates as email_templates,
  _escrow_release_request as escrow_release_request,
  _euro_to_gbp as euro_to_gbp,
  _faq_categories as faq_categories,
  _faqs as faqs,
  _files as files,
  _footer_text as footer_text,
  _gbp_rate_history as gbp_rate_history,
  _groups as groups,
  _invoices as invoices,
  _invoicesdue as invoicesdue,
  _ipn_return as ipn_return,
  _job_list_manage as job_list_manage,
  _login_info as login_info,
  _message_dialog as message_dialog,
  _message_relation as message_relation,
  _messages as messages,
  _msg_dialog_relation as msg_dialog_relation,
  _mytable as mytable,
  _notif_email_list as notif_email_list,
  _packages as packages,
  _page as page,
  _page_details as page_details,
  _page_it as page_it,
  _page_uk as page_uk,
  _particular_job_manage as particular_job_manage,
  _payments as payments,
  _popular_search as popular_search,
  _portfolio as portfolio,
  _prebid_message_relation as prebid_message_relation,
  _prebid_messages as prebid_messages,
  _project_cases as project_cases,
  _project_description_relation as project_description_relation,
  _project_descriptions as project_descriptions,
  _project_images as project_images,
  _project_invitation as project_invitation,
  _project_relation as project_relation,
  _project_topics as project_topics,
  _projects as projects,
  _projects_preview as projects_preview,
  _projects_temp as projects_temp,
  _rating_hold as rating_hold,
  _rejected_domains as rejected_domains,
  _report_violation as report_violation,
  _review_relation as review_relation,
  _reviews as reviews,
  _roles as roles,
  _sales as sales,
  _sessions as sessions,
  _settings as settings,
  _settings_it as settings_it,
  _settings_uk as settings_uk,
  _steps_completed_by_customer as steps_completed_by_customer,
  _steps_completed_by_supplier as steps_completed_by_supplier,
  _subscriptionuser as subscriptionuser,
  _supplier_job_page as supplier_job_page,
  _supplier_steps as supplier_steps,
  _support as support,
  _suspend as suspend,
  _test_table as test_table,
  _testimonials as testimonials,
  _transactions as transactions,
  _user_balance as user_balance,
  _user_categories as user_categories,
  _user_contacts as user_contacts,
  _user_list as user_list,
  _user_relation as user_relation,
  _users as users,
};

export type {
  admin_apprv_imgsAttributes,
  admin_apprv_imgsCreationAttributes,
  admin_siteAttributes,
  admin_siteCreationAttributes,
  adminsAttributes,
  adminsCreationAttributes,
  affiliate_archiveAttributes,
  affiliate_archiveCreationAttributes,
  affiliate_paymentAttributes,
  affiliate_paymentCreationAttributes,
  affiliate_questionsAttributes,
  affiliate_questionsCreationAttributes,
  affiliate_released_paymentsAttributes,
  affiliate_released_paymentsCreationAttributes,
  affiliate_unreleased_paymentsAttributes,
  affiliate_unreleased_paymentsCreationAttributes,
  affiliate_welcome_msgAttributes,
  affiliate_welcome_msgCreationAttributes,
  bansAttributes,
  bansCreationAttributes,
  bid_relationAttributes,
  bid_relationCreationAttributes,
  bidsAttributes,
  bidsCreationAttributes,
  bookmarkAttributes,
  bookmarkCreationAttributes,
  categoriesAttributes,
  categoriesCreationAttributes,
  clickthroughsAttributes,
  clickthroughsCreationAttributes,
  commission_rateAttributes,
  commission_rateCreationAttributes,
  contactsAttributes,
  contactsCreationAttributes,
  countryAttributes,
  countryCreationAttributes,
  country_masterAttributes,
  country_masterCreationAttributes,
  country_master_newAttributes,
  country_master_newCreationAttributes,
  current_commission_rateAttributes,
  current_commission_rateCreationAttributes,
  customer_job_pageAttributes,
  customer_job_pageCreationAttributes,
  delivery_contactsAttributes,
  delivery_contactsCreationAttributes,
  dispute_agreeAttributes,
  dispute_agreeCreationAttributes,
  draftprojectsAttributes,
  draftprojectsCreationAttributes,
  email_templatesAttributes,
  email_templatesCreationAttributes,
  escrow_release_requestAttributes,
  escrow_release_requestCreationAttributes,
  euro_to_gbpAttributes,
  euro_to_gbpCreationAttributes,
  faq_categoriesAttributes,
  faq_categoriesCreationAttributes,
  faqsAttributes,
  faqsCreationAttributes,
  filesAttributes,
  filesCreationAttributes,
  footer_textAttributes,
  footer_textCreationAttributes,
  gbp_rate_historyAttributes,
  gbp_rate_historyCreationAttributes,
  groupsAttributes,
  groupsCreationAttributes,
  invoicesAttributes,
  invoicesCreationAttributes,
  invoicesdueAttributes,
  invoicesdueCreationAttributes,
  ipn_returnAttributes,
  ipn_returnCreationAttributes,
  job_list_manageAttributes,
  job_list_manageCreationAttributes,
  login_infoAttributes,
  login_infoCreationAttributes,
  message_dialogAttributes,
  message_dialogCreationAttributes,
  message_relationAttributes,
  message_relationCreationAttributes,
  messagesAttributes,
  messagesCreationAttributes,
  msg_dialog_relationAttributes,
  msg_dialog_relationCreationAttributes,
  mytableAttributes,
  mytableCreationAttributes,
  notif_email_listAttributes,
  notif_email_listCreationAttributes,
  packagesAttributes,
  packagesCreationAttributes,
  pageAttributes,
  pageCreationAttributes,
  page_detailsAttributes,
  page_detailsCreationAttributes,
  page_itAttributes,
  page_itCreationAttributes,
  page_ukAttributes,
  page_ukCreationAttributes,
  particular_job_manageAttributes,
  particular_job_manageCreationAttributes,
  paymentsAttributes,
  paymentsCreationAttributes,
  popular_searchAttributes,
  popular_searchCreationAttributes,
  portfolioAttributes,
  portfolioCreationAttributes,
  prebid_message_relationAttributes,
  prebid_message_relationCreationAttributes,
  prebid_messagesAttributes,
  prebid_messagesCreationAttributes,
  project_casesAttributes,
  project_casesCreationAttributes,
  project_description_relationAttributes,
  project_description_relationCreationAttributes,
  project_descriptionsAttributes,
  project_descriptionsCreationAttributes,
  project_imagesAttributes,
  project_imagesCreationAttributes,
  project_invitationAttributes,
  project_invitationCreationAttributes,
  project_relationAttributes,
  project_relationCreationAttributes,
  project_topicsAttributes,
  project_topicsCreationAttributes,
  projectsAttributes,
  projectsCreationAttributes,
  projects_previewAttributes,
  projects_previewCreationAttributes,
  projects_tempAttributes,
  projects_tempCreationAttributes,
  rating_holdAttributes,
  rating_holdCreationAttributes,
  rejected_domainsAttributes,
  rejected_domainsCreationAttributes,
  report_violationAttributes,
  report_violationCreationAttributes,
  review_relationAttributes,
  review_relationCreationAttributes,
  reviewsAttributes,
  reviewsCreationAttributes,
  rolesAttributes,
  rolesCreationAttributes,
  salesAttributes,
  salesCreationAttributes,
  sessionsAttributes,
  sessionsCreationAttributes,
  settingsAttributes,
  settingsCreationAttributes,
  settings_itAttributes,
  settings_itCreationAttributes,
  settings_ukAttributes,
  settings_ukCreationAttributes,
  steps_completed_by_customerAttributes,
  steps_completed_by_customerCreationAttributes,
  steps_completed_by_supplierAttributes,
  steps_completed_by_supplierCreationAttributes,
  subscriptionuserAttributes,
  subscriptionuserCreationAttributes,
  supplier_job_pageAttributes,
  supplier_job_pageCreationAttributes,
  supplier_stepsAttributes,
  supplier_stepsCreationAttributes,
  supportAttributes,
  supportCreationAttributes,
  suspendAttributes,
  suspendCreationAttributes,
  test_tableAttributes,
  test_tableCreationAttributes,
  testimonialsAttributes,
  testimonialsCreationAttributes,
  transactionsAttributes,
  transactionsCreationAttributes,
  user_balanceAttributes,
  user_balanceCreationAttributes,
  user_categoriesAttributes,
  user_categoriesCreationAttributes,
  user_contactsAttributes,
  user_contactsCreationAttributes,
  user_listAttributes,
  user_listCreationAttributes,
  user_relationAttributes,
  user_relationCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const admin_apprv_imgs = _admin_apprv_imgs.initModel(sequelize);
  const admin_site = _admin_site.initModel(sequelize);
  const admins = _admins.initModel(sequelize);
  const affiliate_archive = _affiliate_archive.initModel(sequelize);
  const affiliate_payment = _affiliate_payment.initModel(sequelize);
  const affiliate_questions = _affiliate_questions.initModel(sequelize);
  const affiliate_released_payments = _affiliate_released_payments.initModel(sequelize);
  const affiliate_unreleased_payments = _affiliate_unreleased_payments.initModel(sequelize);
  const affiliate_welcome_msg = _affiliate_welcome_msg.initModel(sequelize);
  const bans = _bans.initModel(sequelize);
  const bid_relation = _bid_relation.initModel(sequelize);
  const bids = _bids.initModel(sequelize);
  const bookmark = _bookmark.initModel(sequelize);
  const categories = _categories.initModel(sequelize);
  const clickthroughs = _clickthroughs.initModel(sequelize);
  const commission_rate = _commission_rate.initModel(sequelize);
  const contacts = _contacts.initModel(sequelize);
  const country = _country.initModel(sequelize);
  const country_master = _country_master.initModel(sequelize);
  const country_master_new = _country_master_new.initModel(sequelize);
  const current_commission_rate = _current_commission_rate.initModel(sequelize);
  const customer_job_page = _customer_job_page.initModel(sequelize);
  const delivery_contacts = _delivery_contacts.initModel(sequelize);
  const dispute_agree = _dispute_agree.initModel(sequelize);
  const draftprojects = _draftprojects.initModel(sequelize);
  const email_templates = _email_templates.initModel(sequelize);
  const escrow_release_request = _escrow_release_request.initModel(sequelize);
  const euro_to_gbp = _euro_to_gbp.initModel(sequelize);
  const faq_categories = _faq_categories.initModel(sequelize);
  const faqs = _faqs.initModel(sequelize);
  const files = _files.initModel(sequelize);
  const footer_text = _footer_text.initModel(sequelize);
  const gbp_rate_history = _gbp_rate_history.initModel(sequelize);
  const groups = _groups.initModel(sequelize);
  const invoices = _invoices.initModel(sequelize);
  const invoicesdue = _invoicesdue.initModel(sequelize);
  const ipn_return = _ipn_return.initModel(sequelize);
  const job_list_manage = _job_list_manage.initModel(sequelize);
  const login_info = _login_info.initModel(sequelize);
  const message_dialog = _message_dialog.initModel(sequelize);
  const message_relation = _message_relation.initModel(sequelize);
  const messages = _messages.initModel(sequelize);
  const msg_dialog_relation = _msg_dialog_relation.initModel(sequelize);
  const mytable = _mytable.initModel(sequelize);
  const notif_email_list = _notif_email_list.initModel(sequelize);
  const packages = _packages.initModel(sequelize);
  const page = _page.initModel(sequelize);
  const page_details = _page_details.initModel(sequelize);
  const page_it = _page_it.initModel(sequelize);
  const page_uk = _page_uk.initModel(sequelize);
  const particular_job_manage = _particular_job_manage.initModel(sequelize);
  const payments = _payments.initModel(sequelize);
  const popular_search = _popular_search.initModel(sequelize);
  const portfolio = _portfolio.initModel(sequelize);
  const prebid_message_relation = _prebid_message_relation.initModel(sequelize);
  const prebid_messages = _prebid_messages.initModel(sequelize);
  const project_cases = _project_cases.initModel(sequelize);
  const project_description_relation = _project_description_relation.initModel(sequelize);
  const project_descriptions = _project_descriptions.initModel(sequelize);
  const project_images = _project_images.initModel(sequelize);
  const project_invitation = _project_invitation.initModel(sequelize);
  const project_relation = _project_relation.initModel(sequelize);
  const project_topics = _project_topics.initModel(sequelize);
  const projects = _projects.initModel(sequelize);
  const projects_preview = _projects_preview.initModel(sequelize);
  const projects_temp = _projects_temp.initModel(sequelize);
  const rating_hold = _rating_hold.initModel(sequelize);
  const rejected_domains = _rejected_domains.initModel(sequelize);
  const report_violation = _report_violation.initModel(sequelize);
  const review_relation = _review_relation.initModel(sequelize);
  const reviews = _reviews.initModel(sequelize);
  const roles = _roles.initModel(sequelize);
  const sales = _sales.initModel(sequelize);
  const sessions = _sessions.initModel(sequelize);
  const settings = _settings.initModel(sequelize);
  const settings_it = _settings_it.initModel(sequelize);
  const settings_uk = _settings_uk.initModel(sequelize);
  const steps_completed_by_customer = _steps_completed_by_customer.initModel(sequelize);
  const steps_completed_by_supplier = _steps_completed_by_supplier.initModel(sequelize);
  const subscriptionuser = _subscriptionuser.initModel(sequelize);
  const supplier_job_page = _supplier_job_page.initModel(sequelize);
  const supplier_steps = _supplier_steps.initModel(sequelize);
  const support = _support.initModel(sequelize);
  const suspend = _suspend.initModel(sequelize);
  const test_table = _test_table.initModel(sequelize);
  const testimonials = _testimonials.initModel(sequelize);
  const transactions = _transactions.initModel(sequelize);
  const user_balance = _user_balance.initModel(sequelize);
  const user_categories = _user_categories.initModel(sequelize);
  const user_contacts = _user_contacts.initModel(sequelize);
  const user_list = _user_list.initModel(sequelize);
  const user_relation = _user_relation.initModel(sequelize);
  const users = _users.initModel(sequelize);

  users.belongsTo(country, { as: "country_code_country", foreignKey: "country_code"});
  country.hasMany(users, { as: "users", foreignKey: "country_code"});
  prebid_messages.belongsTo(prebid_messages, { as: "reply_for_prebid_message", foreignKey: "reply_for"});
  prebid_messages.hasMany(prebid_messages, { as: "prebid_messages", foreignKey: "reply_for"});
  bids.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(bids, { as: "bids", foreignKey: "project_id"});
  messages.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(messages, { as: "messages", foreignKey: "project_id"});
  notif_email_list.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(notif_email_list, { as: "notif_email_lists", foreignKey: "project_id"});
  prebid_messages.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(prebid_messages, { as: "prebid_messages", foreignKey: "project_id"});
  project_images.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(project_images, { as: "project_images", foreignKey: "project_id"});
  reviews.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(reviews, { as: "reviews", foreignKey: "project_id"});
  transactions.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(transactions, { as: "transactions", foreignKey: "project_id"});
  invoices.belongsTo(transactions, { as: "transaction", foreignKey: "transaction_id"});
  transactions.hasMany(invoices, { as: "invoices", foreignKey: "transaction_id"});
  bids.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(bids, { as: "bids", foreignKey: "user_id"});
  messages.belongsTo(users, { as: "from", foreignKey: "from_id"});
  users.hasMany(messages, { as: "messages", foreignKey: "from_id"});
  messages.belongsTo(users, { as: "to", foreignKey: "to_id"});
  users.hasMany(messages, { as: "to_messages", foreignKey: "to_id"});
  notif_email_list.belongsTo(users, { as: "customer", foreignKey: "customer_id"});
  users.hasMany(notif_email_list, { as: "notif_email_lists", foreignKey: "customer_id"});
  prebid_messages.belongsTo(users, { as: "from", foreignKey: "from_id"});
  users.hasMany(prebid_messages, { as: "prebid_messages", foreignKey: "from_id"});
  projects.belongsTo(users, { as: "creator", foreignKey: "creator_id"});
  users.hasMany(projects, { as: "projects", foreignKey: "creator_id"});
  projects.belongsTo(users, { as: "programmer", foreignKey: "programmer_id"});
  users.hasMany(projects, { as: "programmer_projects", foreignKey: "programmer_id"});
  reviews.belongsTo(users, { as: "buyer", foreignKey: "buyer_id"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "buyer_id"});
  reviews.belongsTo(users, { as: "provider", foreignKey: "provider_id"});
  users.hasMany(reviews, { as: "provider_reviews", foreignKey: "provider_id"});
  transactions.belongsTo(users, { as: "creator", foreignKey: "creator_id"});
  users.hasMany(transactions, { as: "transactions", foreignKey: "creator_id"});
  transactions.belongsTo(users, { as: "reciever", foreignKey: "reciever_id"});
  users.hasMany(transactions, { as: "reciever_transactions", foreignKey: "reciever_id"});

  return {
    admin_apprv_imgs: admin_apprv_imgs,
    admin_site: admin_site,
    admins: admins,
    affiliate_archive: affiliate_archive,
    affiliate_payment: affiliate_payment,
    affiliate_questions: affiliate_questions,
    affiliate_released_payments: affiliate_released_payments,
    affiliate_unreleased_payments: affiliate_unreleased_payments,
    affiliate_welcome_msg: affiliate_welcome_msg,
    bans: bans,
    bid_relation: bid_relation,
    bids: bids,
    bookmark: bookmark,
    categories: categories,
    clickthroughs: clickthroughs,
    commission_rate: commission_rate,
    contacts: contacts,
    country: country,
    country_master: country_master,
    country_master_new: country_master_new,
    current_commission_rate: current_commission_rate,
    customer_job_page: customer_job_page,
    delivery_contacts: delivery_contacts,
    dispute_agree: dispute_agree,
    draftprojects: draftprojects,
    email_templates: email_templates,
    escrow_release_request: escrow_release_request,
    euro_to_gbp: euro_to_gbp,
    faq_categories: faq_categories,
    faqs: faqs,
    files: files,
    footer_text: footer_text,
    gbp_rate_history: gbp_rate_history,
    groups: groups,
    invoices: invoices,
    invoicesdue: invoicesdue,
    ipn_return: ipn_return,
    job_list_manage: job_list_manage,
    login_info: login_info,
    message_dialog: message_dialog,
    message_relation: message_relation,
    messages: messages,
    msg_dialog_relation: msg_dialog_relation,
    mytable: mytable,
    notif_email_list: notif_email_list,
    packages: packages,
    page: page,
    page_details: page_details,
    page_it: page_it,
    page_uk: page_uk,
    particular_job_manage: particular_job_manage,
    payments: payments,
    popular_search: popular_search,
    portfolio: portfolio,
    prebid_message_relation: prebid_message_relation,
    prebid_messages: prebid_messages,
    project_cases: project_cases,
    project_description_relation: project_description_relation,
    project_descriptions: project_descriptions,
    project_images: project_images,
    project_invitation: project_invitation,
    project_relation: project_relation,
    project_topics: project_topics,
    projects: projects,
    projects_preview: projects_preview,
    projects_temp: projects_temp,
    rating_hold: rating_hold,
    rejected_domains: rejected_domains,
    report_violation: report_violation,
    review_relation: review_relation,
    reviews: reviews,
    roles: roles,
    sales: sales,
    sessions: sessions,
    settings: settings,
    settings_it: settings_it,
    settings_uk: settings_uk,
    steps_completed_by_customer: steps_completed_by_customer,
    steps_completed_by_supplier: steps_completed_by_supplier,
    subscriptionuser: subscriptionuser,
    supplier_job_page: supplier_job_page,
    supplier_steps: supplier_steps,
    support: support,
    suspend: suspend,
    test_table: test_table,
    testimonials: testimonials,
    transactions: transactions,
    user_balance: user_balance,
    user_categories: user_categories,
    user_contacts: user_contacts,
    user_list: user_list,
    user_relation: user_relation,
    users: users,
  };
}
