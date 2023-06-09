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

    new google.cloudbuildTrigger.CloudbuildTrigger(this, 'buildTrigger', {
        filename: 'cloudbuild.yaml',
        github: {
            name: repository,
            owner: 'hsmtkk',
            push: {
                branch: 'main',
            },
        },
    });

    new google.storageBucket.StorageBucket(this, 'sampleResource', {
        location: region,
        name: `sample-bucket-${project}`,
    });

  }
}

const app = new App();
new MyStack(app, "studious-system");
app.synth();
