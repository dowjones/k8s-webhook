# k8s-webhook

1. `cd docker`
2. `docker build . -t localserver`
3. Cut and Paste the root CA from the docker build output `Step 12/13 : RUN cat rootCA.crt | base64 | tr -d '\n'` and replace the value currently in https://github.com/dowjones/k8s-webhook/blob/master/k8s/hook.yaml#L14
4. `cd ../k8s`
5. `kubectl create -f deployment.yaml`
6. `kubectl create -f service.yaml`
7. `kubectl create -f hook.yaml`
8. `kubectl create -f test.yaml`
