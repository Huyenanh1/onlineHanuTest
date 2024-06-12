const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const db = require('./dbsetup');

passport.use(
	new GoogleStrategy(
		{
			clientID: "",
			clientSecret: "",
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		async  function (accessToken, refreshToken, profile, callback) {
			const user = {
				googleID: profile.id,
				name: profile.displayName,
				email: profile.emails[0].value,
			  };
				// User does not exist, insert the user into the database
				db.query("INSERT INTO users SET ?", user, (error, results) => {
					if (error) throw error;
					return callback(null, user);
				});
				 
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
