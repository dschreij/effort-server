Meteor.methods({
  deleteSession(_id) {
    check(_id, Meteor.Collection.ObjectID);
    Sessions.remove({ _id });
  },
});
