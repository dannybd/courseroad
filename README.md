# [CourseRoad](https://courseroad.mit.edu)

CourseRoad is a four-year academic planner for MIT undergraduates. It works as a single-page application which features a vertical timeline where users can add their courses and majors to receive immediate visual feedback on how they're doing on requisite and degree requirements. Users' course configurations ("roads") can be saved with an anonymous hash, but logging in allows for users to manage saved roads, change the hash for a given road, or mark a road as a public road (where it will be visible at `courseroad.mit.edu/username`).

Together, this makes CourseRoad an easy way to plan out classes, majors, and minors which you may hypothetically wish to take in the future, and then share those plans with anyone you wish. Checking whether a double major is feasible (and emailing the idea to your advisor) is now significantly easier.

You can see a working example of CourseRoad in action here: [https://courseroad.mit.edu/dannybd](https://courseroad.mit.edu/dannybd)

## Installation

Although a lot of work has gone into making the code transplantable, it still remains dependent on MIT to function, in terms of both infrastructure (e.g. MIT certificates are used for login, courses are pulled from the Data Warehouse) and culture (e.g. MIT majors and courses are expected by the code, courses are referred to by subject IDs (8.033) not by title (Relativity)). Further work is require to generalize this code to other colleges and universities.

Those caveats aside, implementation at MIT requires sqlplus, [access to the Data Warehouse](http://ist.mit.edu/business/warehouse/access), and a SQL database of your own.

Once you have those set up, clone the repo:

    git clone git://github.com/dannybd/courseroad.git && cd courseroad

Set up the database tables:

    mysql -u username -p -h localhost database_name < setup-courseroad-db.sql

Then copy and modify the template files to provide your variables. First, set values for CR_HOST and CR_PATH, which must match the public URL:

    cp .htaccess-TEMPLATE .htaccess && nano .htaccess

Second, set values for the database credentials:

    cp settings.ini-TEMPLATE settings.ini && nano settings.ini


At this point, you can load up your instance of CourseRoad, and it should be functioning--albeit without any course information. To fix that, edit `pull-new-classes.sh` to provide the script with your Data Warehouse credentials and sqlplus implementation, then import everything with:

    bash pull-new-classes.sh -n 9999
    # Script usage:
    # -n N Pulls all classes updated in the Warehouse in the last N days. Defaults to 1.
    # -t   Runs the script in test mode, and doesn't actually save the classes into your database.

It's recommended to set up a cron job to pull in the latest classes on a daily basis.

## API Reference

There is, to some degree, an API which allows you to import classes into CourseRoad. If you structure a URL like so:

    https://courseroad.mit.edu/?hash=ZmQ3M0&year=2015&term=3&addclasses=8.02,18.03,7.014,STS.050

###Important bits:

* **addclasses [required]:** A comma-delimited list of the classes to add. Joint classes (with the Js appended) can either have or not have the J at the end: it's up to you.

* **hash:** The CourseRoad hash corresponding to the road the user wants to append classes to. This is optional: leaving it out will add the classes to an empty road.

* **year:** The academic year version of the classes to pull. Default value is whatever the upcoming year is. If you request a year (e.g. 2016) which doesn't have class data yet, CourseRoad will switch to using the 2016 data when it becomes available. Note that Fall 2015 is in the '15-'16 academic year, and thus counts as 2016.

* **term:** The term number of the semester you're adding the classes to. It follows a pattern as follows:

        0  = Prior Credit
        1  = Freshman Fall
        2  = Freshman IAP
        3  = Freshman Spring
        4  = Freshman Summer
        5  = Sophomore Fall
        ...
        9  = Junior Fall
        ...
        13 = Senior Fall
        ...
        17 = Super-Senior Fall
This defaults to 1, Freshman Fall.

## Contributors

Questions, comments, bugs, and complaints can all be directed to [the name of this repo]@mit.edu.

## License

Everything's under the MIT License.