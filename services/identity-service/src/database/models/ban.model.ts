import { DataTypes, Model, Optional } from "sequelize";
import { db } from "@/configs/database";
import { User } from "./user.model";

interface BanAttributes {
    id: number;
    phone: string;
    reason: string;
    expiresAt: Date | null;   //null بودن یعنی کاربر برا همیشه بن شده. 
    userId: number;
}

interface BanCreationAttributes extends Optional<BanAttributes, "id" | "expiresAt"> { }

export class Ban extends Model<BanAttributes, BanCreationAttributes>
    implements BanAttributes {
    declare id: number;
    declare phone: string;
    declare reason: string;
    declare expiresAt: Date | null;   //null بودن یعنی کاربر برا همیشه بن شده. 
    declare userId: number;
}

Ban.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(13),
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: true,                           
            field: "expires_at"
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
        tableName: "bans",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            { fields: ["phone"] },
            { fields: ["user_id"] },
        ],

    }
);


User.hasMany(Ban, { foreignKey: "userId", as: "bans" });
Ban.belongsTo(User, { foreignKey: "userId", as: "user" })