mongoimport --host cluster0-shard-00-00-qn7fq.mongodb.net:27017,cluster0-shard-00-01-qn7fq.mongodb.net:27017,cluster0-shard-00-02-qn7fq.mongodb.net:27017/test?replicaSet=Cluster0-shard-0 -d serfclub -c streams -u pwr -p a9Hn87B8SF38 --file cams.csv --type csv --headerline

mongoimport --host cluster0-shard-00-00-qn7fq.mongodb.net:27017,cluster0-shard-00-01-qn7fq.mongodb.net:27017,cluster0-shard-00-02-qn7fq.mongodb.net:27017 --ssl -u pwr -p a9Hn87B8SF38 --authenticationDatabase admin --db serfclub --collection streams --drop --headerline --type csv --file cams.csv
