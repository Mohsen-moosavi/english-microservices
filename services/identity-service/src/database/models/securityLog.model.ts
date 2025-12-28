import { DataTypes, Model, Optional } from "sequelize";
import { db } from "@/configs/database";
import { User } from "./user.model";

interface SecurityLogAttributes {
    id: number;
    userId: number | null;
    ip: string | null;
    action: string;
    details: string;
}

interface SecurityLogCreationAttributes extends Optional<SecurityLogAttributes, "id" | "ip"> { }

export class SecurityLog extends Model<SecurityLogAttributes, SecurityLogCreationAttributes>
    implements SecurityLogAttributes {
    declare id: number;
    declare userId: number | null;
    declare ip: string | null;
    declare action: string;
    declare details: string;
    declare createdAt: Date;
}

SecurityLog.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            field: "user_id",
        }
    },
    {
        sequelize: db,
        tableName: "security_logs",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

User.hasMany(SecurityLog, { foreignKey: "userId", as: "users" });
SecurityLog.belongsTo(User, { foreignKey: "userId", as: "securityLog" })