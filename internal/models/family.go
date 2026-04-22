package models

// Family groups users; owner_id is the creating user.
type Family struct {
	ID      uint `gorm:"primaryKey" json:"id"`
	OwnerID uint `gorm:"not null;index" json:"owner_id"`
}

func (Family) TableName() string {
	return "families"
}

// Family member roles.
const (
	FamilyRoleOwner  = "owner"
	FamilyRoleAdmin  = "admin"
	FamilyRoleMember = "member"
)

// FamilyMember links a user to a family with a role (one family per user).
type FamilyMember struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	FamilyID uint   `gorm:"not null;index" json:"family_id"`
	Family   Family `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"-"`
	UserID   uint   `gorm:"not null;uniqueIndex" json:"user_id"`
	User     User   `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"-"`
	Role     string `gorm:"size:32;not null" json:"role"`
}

func (FamilyMember) TableName() string {
	return "family_members"
}
