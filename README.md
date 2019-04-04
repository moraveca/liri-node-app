# liri-node-app

Welcome to my liri-node-app! Below you can find instructions on what exactly this app does and how to use it. Since this app exclusively uses Node.js, you'll have to run it within your own ecosystem. You will have to use the following command in order to download required packages:

npm install

And you'll also have to create an .env file within your local repository and input your own spotify keys in order for spotify-this to work (more on this in the Spotify section).

## movie-this

This function uses the OMDB API to search for a specified movie and then print information about it to your console. In order for it to work, type in your command line:

node liri.js movie-this

This command calls the function and will output information for Mr. Nobody. To search for a specific movie like, "The Lady Eve," type the title of the movie after the command. For example:

node liri.js movie-this the lady eve

This will print general information about, "The Lady Eve," in your console as well as log the same data with a time stamp into the file: log.txt

## concert-this

This function uses the BandsInTown API to search for upcoming concerts for specified bands. You will have to choose a band you'd like to search for, say, "Rolling Stones," and type this in your terminal:

node liri.js concert-this rolling stones

This will print a list of upcoming concerts that the Rolling Stones has in your console. It will also log the same data with a time stamp into the file: log.txt

## spotify-this-song

This function uses the Spotify API to search for specified song titles with the Spotify database. As mentioned, you will have to create an .env file on your local repository and include your own Spotify key. The .env file should look like this inside:

SPOTIFY_ID=your-id-here
SPOTIFY_SECRET=your-secret-here

Once everything is set up, you'll need to use the following command in your terminal to call the function:

node liri.js spotify-this-song

Without any other user input, this will print song information for Ace of Base's, "The Sign," into your console as well as onto the log.txt file. To specify your own song search, simply include the song title after the command as before:

node liri.js spotify-this-song ramble on

Information about this song will then be printed in your console and log.txt file.

## Other Commands

### do-what-it-says

Included in the uploaded repository should be a random.txt file. Inside should be something like this:

spotify-this-song,"I Want It That Way"

If you call the following command in your terminal:

node liri.js do-what-it-says

the app will execute the first part of the command (in this example "spotify-this-song") and search for what follows (in this example "I Want It That Way"). Feel free to change the command and the search query, but leave the format the same.

### clear-log

You can also clear the log.txt file (it can get quite full quite quickly). Use the following command in your terminal:

node liri.js clear-log

This command will delete whatever you have stored in log.txt and is nor reversible. So be careful!



