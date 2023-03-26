import { Construct } from "constructs";
import { App, TerraformStack, GcsBackend } from "cdktf";
import * as google from '@cdktf/provider-google';

const project = 'studious-system';
const region = 'us-central1';
const repository = 'studious-system';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new google.provider.GoogleProvider(this, 'google', {
        project,
        region
    });

    new GcsBackend(this, {
        bucket: `backend-${project}`,
    });

    const buildRunner = new google.serviceAccount.ServiceAccount(this, 'buildRunner', {
        accountId: 'build-runner',
    });

    new google.cloudbuildTrigger.CloudbuildTrigger(this, 'buildTrigger', {
        filename: 'cloudbuild.yaml',
        github: {
            name: repository,
            owner: 'hsmtkk',
            push: {
                branch: 'main',
            },
        },
        serviceAccount: buildRunner.id,
    });
    
  }
}

const app = new App();
new MyStack(app, "studious-system");
app.synth();
