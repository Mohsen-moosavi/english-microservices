import { DataTypes, Model, Optional } from "sequelize";
import { db } from "@/configs/database";
import { User } from "./user.model";

interface ProfileAttributes {
    id: number;
    name: string;
    avatar: string | null;
    userId: number;
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, "id"> { }

export class Profile extends Model<ProfileAttributes, ProfileCreationAttributes>
    implements ProfileAttributes {
    declare id: number;
    declare name: string;
    declare avatar: string;
    declare userId: number;
}

Profile.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: "user_id",
            unique: true,
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
        tableName: "profiles",
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);


User.hasOne(Profile, { foreignKey: "userId", as: "profile" });
Profile.belongsTo(User, { foreignKey: "userId", as: "user" })