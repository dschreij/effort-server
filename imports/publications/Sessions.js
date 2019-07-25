Meteor.publish('Sessions', function () {
  return Sessions.find({});
});
