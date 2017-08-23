# smm
### An API package for getting information relating to Super Mario Maker, including course information and user stats

## Install
```
npm i smm --save
```

## Usage

### getCourseData(courseID, callback)
Accepts two arguments:
* `courseID`: The 16-digit course ID
* `callback`: Callback when course data is grabbed:
    * `error`: An error, if there was one
    * `data`: All available course data
```javascript
var smm = require('smm');

smm.getCourseData(courseID, (error, data) => {
    if (error) throw error;
    console.log(data); // All data relating to the course
});
```
If no error, returns:
* `id`: The 16-digit course ID
* `name`: The course name
* `tag`: The course tag
* `style`: Short-hand version of course style (skin)
* `style_long`: Longer, full, version of course style (skin)
* `style_icon`: URL to the course style icon
* `created`: When the course was made. Either a relative time (1 day ago) or date (09/25/15)
* `difficulty`: Course difficulty
* `plays`: Individual plays
* `attempts`: Total attempts
* `clears`: Clear count
* `stars`: Star count
* `shares`: Social media shares
* `clear_rate`: Percentage between 0 and 100
* `miiverse_url`: URL to course MiiVerse post
* `thumbail`: Thumbnail URL
* `full_view`: URL to full course image
* `creator`: Player object for creator
    * `profile`: URL to players account
    * `mii`: URL to players Mii image
    * `display_name`: Players Mii display name
    * `profile_name`: Players profile name
    * `flag`: Players country short-hand
    * `medals`: Total medals player has
* `first_clear`: Player object for first clear-player
    * `profile`: URL to players account
    * `mii`: URL to players Mii image
    * `display_name`: Players Mii display name
    * `profile_name`: Players profile name
    * `flag`: Players country short-hand
* `world_record`: Player object for world record holder
    * `profile`: URL to players account
    * `mii`: URL to players Mii image
    * `display_name`: Players Mii display name
    * `profile_name`: Players profile name
    * `flag`: Players country short-hand
    * `time_readable`: Readable version of the world record time
    * `time`: World record time in milliseconds
* `recent_players`: Array of player objects
    * `profile`: URL to players account
    * `mii`: URL to players Mii image
    * `display_name`: Players Mii display name
    * `profile_name`: Players profile name
    * `flag`: Players country short-hand
* `cleared_by`: Array of player objects
    * `profile`: URL to players account
    * `mii`: URL to players Mii image
    * `display_name`: Players Mii display name
    * `profile_name`: Players profile name
    * `flag`: Players country short-hand
* `stared_by`: Array of player objects
    * `profile`: URL to players account
    * `mii`: URL to players Mii image
    * `display_name`: Players Mii display name
    * `profile_name`: Players profile name
    * `flag`: Players country short-hand