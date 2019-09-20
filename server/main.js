import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { Sessions, Heartbeats } from '../imports/collections/Sessions.js';

Meteor.methods({
  deleteSession(_id) {
    check(_id, Meteor.Collection.ObjectID);
    Sessions.remove({ _id });
    Heartbeats.remove({ session: _id });
  },
  deleteAllSessions() {
    Sessions.remove({});
    Heartbeats.remove({});
  },
  saveToySelection({ session, toys }) {
    check(session, Object);
    check(toys, Array);
    Sessions.update({ _id: session._id }, { $set: { toys } });
  },
});

publishComposite('Sessions', {
  find() {
    return Sessions.find({}, {
      sort: {
        cabin: 1,
      },
      pollingIntervalMs: 2000
    });
  },
  children: [
    {
      find(session) {
        return Heartbeats.find({ session: session._id }, { pollingIntervalMs: 5000 });
      },
    },
  ],
});

Meteor.publish('Leaderboard', function() {
  return Sessions.find(
    {
      'points.tournament': {
        $gt: 0,
      },
    },
    {
      sort: {
        'points.tournament': -1,
        'current.last_avg_rt': 1,
      },
      pollingIntervalMs: 5000
    },
  );
});

Meteor.startup(() => {
});

if (module.hot) {
  module.hot.accept();
}
