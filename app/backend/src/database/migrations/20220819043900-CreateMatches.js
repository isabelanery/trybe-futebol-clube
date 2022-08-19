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
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
			},
      homeTeamGoals: {
				type: Sequelize.INTEGER,
        field: 'home_team_goals',
				allowNull: false
			},
      awayTeam: {
				type: Sequelize.INTEGER,
				allowNull: false,
        field: 'away_team',
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
			},
      awayTeamGoals: {
				type: Sequelize.INTEGER,
        field: 'away_team_goals',
				allowNull: false
			},
      inProgress: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
        field: 'in_progress',
			},
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
