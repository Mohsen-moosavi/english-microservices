'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('refresh_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      token_hash: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      revoked_at: {
        type: Sequelize.DATE,
        allowNull: true,                           //تعریف constraint هنگام migration فراموش نشه. (revokedAt> expiresAt)
      },
      ip: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      user_agent: {
        type: Sequelize.STRING(512),
        allowNull: true,
        field: "user_agent"
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });

    await queryInterface.addIndex('refresh_tokens', ['user_id']);
    await queryInterface.addIndex('refresh_tokens', ['expires_at']);
    await queryInterface.addIndex('refresh_tokens', ['revoked_at']);

    await queryInterface.addConstraint('refresh_tokens', {
      fields: ['revoked_at', 'expires_at'],
      type: 'check',
      where: {
        revoked_at: { [Sequelize.Op.gt]: Sequelize.col('expires_at') }
      },
      name: 'check_revoked_after_expired'
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('refresh_tokens');
    await queryInterface.removeIndex('refresh_tokens', ['user_id']);
    await queryInterface.removeIndex('refresh_tokens', ['expires_at']);
    await queryInterface.removeIndex('refresh_tokens', ['revoked_at']);
    await queryInterface.removeConstraint("refresh_tokens", "check_revoked_after_expired");
  }
};
