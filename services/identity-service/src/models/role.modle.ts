import { DataTypes, Model } from "sequelize";
import { db } from "@/configs/database";

export class Role extends Model {
    declare id: number;
    declare name: string;
    declare description: string | null;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique:true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    },
    {
        sequelize: db,
        tableName: "roles",
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);