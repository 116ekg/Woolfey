const Model = require('../../database/models/model.js');
const Redis = require('../../database/redis/redis.js');
const chunk = require('lodash.chunk');

module.exports = {
  weeklyTopPortfolioBalances: (req, res) => {
      
  },
  dailyTopPortfoliosBalances: (req, res) => {

  },
  currentTopPortfoliosBalances: (req, res) => {

  },
  fetchLeaderboard: (req, res) => {
    // leaderboard
    // hourlyLeaderboard
    Redis.zcard(`${req.query.leaderboard}`, )
    Redis.zrevrange(`${req.query.leaderboard}`, 0, -1, 'withscores', (err, data) => {
      if(data){
        const leaderboard = chunk(data,2);
        Promise.all(leaderboard.map(x => new Promise((resolve, reject) => {

          const element = {};
          Model.Portfolio.findOne({where: {id:x[0]}})
          .then(portfolio => {
            Model.User.findOne({where: {id: portfolio.dataValues.userId}})
            .then(user => {
              element.username = user.dataValues.handle;
              element.portfolioName = portfolio.dataValues.name;
              element.portfolioValue = Math.round(x[1] * 100) / 100;
              element.portfolioId = portfolio.dataValues.id;
              resolve(element);
            })
          })
        })
      ))
      .then(totalLeaderboard => {
        res.send(totalLeaderboard);
      })

      } else {
        res.send()
      }
   })
  }

}