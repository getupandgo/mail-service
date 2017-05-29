Start each service separately via it own start script, e.g.:

cd server; npm start

cd mail_sender; npm start

cd tokenizer; npm start

Server runs on port 3000 by default. To send an email post email body on /message as row data
