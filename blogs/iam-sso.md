---
title: "Securing personal AWS accounts: avoid long-lived credentials with SSO"
author: "Joona Gynther"
date: "2023-02-10"
---

It is a AWS best practice to avoid long-lived credentials [1]. You know the kind you currently have stuffed in `~/.aws/credentials`. You have good reasons to have those long-lived credentials, using the AWS CLI or SDKs for example. Still, however convinient it might be, it is not good for your security.

Unlike in your personal AWS environment, at your job or other professional setting you probably have access to an IdP to integrate with AWS to generate nice, easy-to-use and most importantly, short-lived credentials to access resources on AWS.

Ideally, we would want solution similar to using an external IdP to generate those short-lived credentials with minimal hassle. Thankfully achieving this is quite easy using a little less known AWS service, [IAM Identity Center (Successor to AWS Single Sign-On)](https://aws.amazon.com/iam/identity-center/).

While quite a mouthful, IAM Identity Center _"provides your workforce with single sign-on access to all assigned accounts and applications from one place"_. Simply put, IAM Identity Center is a fully managed service for handling SSO. IAM Identity Center also integrates with AWS CLI to generate short-lived credentials. As a cherry on top, at least at the time of writing, IAM Identity Center is provided at no cost.

## Implementing SSO with IAM Identity Center

The gameplan:

1. Setup IAM Identity Center
2. Create a user
3. Create permissions
4. Configure AWS CLI

### Let's get started.

IAM Identity Center requires your account to be governed by AWS Organizations. If you are working with a personal account, this is most likely not the case. You don't have to setup AWS Organizations yourself, you can have this automatically handled while enabling IAM Identity Center.

First navigate over to [IAM Identity Center in the AWS console](https://console.aws.amazon.com/singlesignon). You can then ClickOps™️ to enable the service. Under **Enable IAM Identity Center** choose **Enable**.

If you don't have organizations setup, you will be prompted to have them enabled for you.

> NOTE: documentation indicates this step needs to be completed via root user account. However, I was able to complete this using a IAM user with AdministratorAccess policy set.

Next step would be choosing your Identity Provider. Identity center defaults to _Identity Center Directory_ as IdP. As we won't be configuring AD or an external IdP, we can leave the settings as default.

### Next, let's create a user

In Identity Center console, on the right, navigate to users. Create a user for yourself.
![IAM Identity Center user creation form](/static/images/iam-sso/user.png)
Click next. We are prompted to add our user to a group. Choose **Create group**.

### Creating a group and permissions

Enter a group name like `Admin` and optionally a description. Choose **create**. Next go back to your user creation tab. Refresh groups and assign your user to the group you just created.

![](/static/images/iam-sso/group.png)

Click next and create your user. After your user has been created, they will be sent a email verification link.

Next, we need to create a _permission set_ to attach to our group. On the right, navigate to **Permission sets** under **Multi-account permissions**. Under **Permission sets** choose **Create permission set**.

![](/static/images/iam-sso/permission-set.png)

> NOTE: no dark mode for this page :/

Choose **Predefined permission set** and **AdministratorAccess**. Click next. You can leave details as default. Here the most important setting is _Session duration_ which defines how long a user can stay logged in for. Click next and create your permission set.

![](/static/images/iam-sso/assign.png)

Next, on the right, under **Multi-account permissions** choose **AWS accounts**. Under root, select your account. Choose **Assign users or groups**. Select the group and permission set you created. Click submit. Wait for the process to finish.

![](/static/images/iam-sso/url.png)

Back in the Identity Center dashboard you can find your _AWS access portal URL_ which looks something like the above. If you verified your user's email, you can now login to the SSO portal using this URL.

If everything was configured correctly you can now login using your user and federate to AWS console.

### Final act: configuring AWS CLI to use SSO

Here we have 3 options:

1. use `aws configure sso`
2. use `aws configure sso-session`
3. manually edit `~/.aws/config`

The first two are automatic wizards to guide you through the process. Refer to [Token provider configuration with automatic authentication refresh for AWS IAM Identity Center (successor to AWS Single Sign-On)](https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html) for more information.

However, if you use Terraform I suggest manually configuring. I had some trouble working with terraform after configuring SSO with `aws configure sso`. I suggest creating a new profile like so:

```bash
[profile example]
sso_start_url = https://my-sso-portal.awsapps.com/start
sso_region = your-region
sso_account_id = 111122223333
sso_role_name = AdministratorAccess
```

You could also configure these as your [default]. Otherwise you will need remember to append `--profile example` after your commands. You could also set the environment variable _AWS_PROFILE_ equal to your profile.

### Conclusion

Congratulations! You can now ditch those credentials living `~/.aws/credentials` and delete them in IAM. From now on simply use `aws sso login --profile example` to initate SSO login to get short term credentials. You can also login to the AWS console using your access portal URL.

---

Disclaimer, at the time of writing, I work at AWS. All opinions my own.

Published on 10.2.2023 by Joona Gynther. You can find me on [LinkedIn](https://www.linkedin.com/in/joona-gynther/).

---

[1] https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-users-federation-idp
