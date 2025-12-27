import { DataTypes, Model, Optional } from "sequelize";
import { db } from "@/configs/database";
import { User } from "./user.model";

interface RefreshTokenAttributes {
    id: number;
    tokenHash: string;
    expiresAt: Date;
    revokedAt: Date | null;
    ip: string;
    userAgent: string;
    userId: number;
}

interface RefreshTokenCreationAttributes extends Optional<RefreshTokenAttributes, "id" | "revokedAt"> { }

export class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
    implements RefreshTokenAttributes {
    declare id: number;
    declare tokenHash: string;
    declare expiresAt: Date;
    declare revokedAt: Date | null;
    declare ip: string;
    declare userAgent: string;
    declare userId: number;
}

RefreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        tokenHash: {
            type: DataTypes.STRING(64),
            allowNull: false,
            field: "token_hash",
            unique: true
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "expires_at"
        },
        revokedAt: {
            type: DataTypes.DATE,
            allowNull: true,                           //تعریف constraint هنگام migration فراموش نشه. (revokedAt> expiresAt)
            field: "revoked_at"
        },
        ip: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        userAgent: {
            type: DataTypes.STRING(512),
            allowNull: true,
            field: "user_agent"
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: "user_id",
            references: {
                model: User,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        sequelize: db,
        tableName: "refresh_tokens",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            { fields: ["user_id"] },
            { fields: ["expires_at"] },
            { fields: ["revoked_at"] },
        ],

    }
);


User.hasMany(RefreshToken, { foreignKey: "userId", as: "refreshTokens" });
RefreshToken.belongsTo(User, { foreignKey: "userId", as: "user" })