'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
      homeTeam: {
				type: Sequelize.INTEGER,
				allowNull: false,
        field: 'home_team',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'TeamModel',
          key: 'id',
        }
			},
      homeTeamGoals: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
      awayTeam: {
				type: Sequelize.INTEGER,
				allowNull: false,
        field: 'away_team',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'TeamModel',
          key: 'id',
        }
			},
      awayTeamGoals: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
      inProgress: {
				type: Sequelize.INTEGER,
				allowNull: false,
        field: 'in_progress',
			},
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
