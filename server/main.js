import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { Sessions, Heartbeats } from '../imports/collections/Sessions.js';

Meteor.methods({
  deleteSession(_id) {
    check(_id, Meteor.Collection.ObjectID);
    Sessions.remove({ _id });
  },
});

publishComposite('Sessions', {
  find() {
    return Sessions.find({});
  },
  children: [
    {
      find(session) {
        return Heartbeats.find({ session: session._id });
      },
    },
  ],
});


Meteor.startup(() => {
});

if (module.hot) {
  module.hot.accept();
}
