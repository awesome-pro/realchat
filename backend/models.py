from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

# Association table for many-to-many relationship between User and Group
group_membership = Table(
    'group_membership', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('group_id', Integer, ForeignKey('groups.id'), primary_key=True)
)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, index=True)

    # Relationships
    sent_chats = relationship("Chat", foreign_keys='Chat.sender_id', back_populates="sender")
    received_chats = relationship("Chat", foreign_keys='Chat.receiver_id', back_populates="receiver")
    groups = relationship('Group', secondary=group_membership, back_populates='members')

class Chat(Base):
    __tablename__ = 'chats'
    id = Column(Integer, primary_key=True, index=True)
    sender_name = Column(String(255))
    sender_id = Column(Integer, ForeignKey('users.id'))
    receiver_id = Column(Integer, ForeignKey('users.id'), nullable=True)  # Nullable for group messages
    group_id = Column(Integer, ForeignKey('groups.id'), nullable=True)  # Nullable for private chats

    message = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_chats")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_chats")
    group = relationship("Group", back_populates="chats")

class Group(Base):
    __tablename__ = 'groups'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)

    # Relationships
    members = relationship('User', secondary=group_membership, back_populates='groups')
    chats = relationship('Chat', back_populates='group')
