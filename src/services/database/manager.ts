import blink from '../../blink/client'
import { 
  User, Team, Scenario, Session, Message, Feedback, Goal, Analytics,
  UserPreferences, TeamSettings, ClientPersona, SessionMetadata, MessageMetadata,
  FeedbackCategory, AnalyticsMetrics
} from './types'

export class DatabaseManager {
  // User management
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user = await blink.db.users.create({
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    return user as User
  }

  async getUser(userId: string): Promise<User | null> {
    const users = await blink.db.users.list({
      where: { id: userId },
      limit: 1
    })
    return users[0] as User || null
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    await blink.db.users.update(userId, {
      ...updates,
      updatedAt: new Date().toISOString()
    })
    return this.getUser(userId) as Promise<User>
  }

  async getUsersByTeam(teamId: string): Promise<User[]> {
    const users = await blink.db.users.list({
      where: { teamId }
    })
    return users as User[]
  }

  // Team management
  async createTeam(teamData: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team> {
    const team = await blink.db.teams.create({
      ...teamData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    return team as Team
  }

  async getTeam(teamId: string): Promise<Team | null> {
    const teams = await blink.db.teams.list({
      where: { id: teamId },
      limit: 1
    })
    return teams[0] as Team || null
  }

  async getTeamsByManager(managerId: string): Promise<Team[]> {
    const teams = await blink.db.teams.list({
      where: { managerId }
    })
    return teams as Team[]
  }

  // Scenario management
  async createScenario(scenarioData: Omit<Scenario, 'id' | 'createdAt' | 'updatedAt'>): Promise<Scenario> {
    const scenario = await blink.db.scenarios.create({
      ...scenarioData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    return scenario as Scenario
  }

  async getScenario(scenarioId: string): Promise<Scenario | null> {
    const scenarios = await blink.db.scenarios.list({
      where: { id: scenarioId },
      limit: 1
    })
    return scenarios[0] as Scenario || null
  }

  async getScenarios(filters?: {
    teamId?: string
    createdBy?: string
    isPublic?: boolean
    difficulty?: string
    industry?: string
  }): Promise<Scenario[]> {
    const where: any = {}
    if (filters?.teamId) where.teamId = filters.teamId
    if (filters?.createdBy) where.createdBy = filters.createdBy
    if (filters?.isPublic !== undefined) where.isPublic = filters.isPublic ? "1" : "0"
    if (filters?.difficulty) where.difficulty = filters.difficulty
    if (filters?.industry) where.industry = filters.industry

    const scenarios = await blink.db.scenarios.list({ where })
    return scenarios as Scenario[]
  }

  async updateScenario(scenarioId: string, updates: Partial<Scenario>): Promise<Scenario> {
    await blink.db.scenarios.update(scenarioId, {
      ...updates,
      updatedAt: new Date().toISOString()
    })
    return this.getScenario(scenarioId) as Promise<Scenario>
  }

  // Session management
  async createSession(sessionData: Omit<Session, 'id' | 'startedAt'>): Promise<Session> {
    const session = await blink.db.sessions.create({
      ...sessionData,
      startedAt: new Date().toISOString()
    })
    return session as Session
  }

  async getSession(sessionId: string): Promise<Session | null> {
    const sessions = await blink.db.sessions.list({
      where: { id: sessionId },
      limit: 1
    })
    return sessions[0] as Session || null
  }

  async getUserSessions(userId: string, limit = 50): Promise<Session[]> {
    const sessions = await blink.db.sessions.list({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      limit
    })
    return sessions as Session[]
  }

  async updateSession(sessionId: string, updates: Partial<Session>): Promise<Session> {
    await blink.db.sessions.update(sessionId, updates)
    return this.getSession(sessionId) as Promise<Session>
  }

  async endSession(sessionId: string, duration: number): Promise<Session> {
    return this.updateSession(sessionId, {
      status: 'completed',
      endedAt: new Date().toISOString(),
      duration
    })
  }

  // Message management
  async createMessage(messageData: Omit<Message, 'id'>): Promise<Message> {
    const message = await blink.db.messages.create(messageData)
    return message as Message
  }

  async getSessionMessages(sessionId: string): Promise<Message[]> {
    const messages = await blink.db.messages.list({
      where: { sessionId },
      orderBy: { timestamp: 'asc' }
    })
    return messages as Message[]
  }

  async updateMessage(messageId: string, updates: Partial<Message>): Promise<Message> {
    await blink.db.messages.update(messageId, updates)
    const messages = await blink.db.messages.list({
      where: { id: messageId },
      limit: 1
    })
    return messages[0] as Message
  }

  // Feedback management
  async createFeedback(feedbackData: Omit<Feedback, 'id' | 'createdAt'>): Promise<Feedback> {
    const feedback = await blink.db.feedback.create({
      ...feedbackData,
      createdAt: new Date().toISOString()
    })
    return feedback as Feedback
  }

  async getFeedback(feedbackId: string): Promise<Feedback | null> {
    const feedback = await blink.db.feedback.list({
      where: { id: feedbackId },
      limit: 1
    })
    return feedback[0] as Feedback || null
  }

  async getSessionFeedback(sessionId: string): Promise<Feedback | null> {
    const feedback = await blink.db.feedback.list({
      where: { sessionId },
      limit: 1
    })
    return feedback[0] as Feedback || null
  }

  async getUserFeedback(userId: string, limit = 20): Promise<Feedback[]> {
    const feedback = await blink.db.feedback.list({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      limit
    })
    return feedback as Feedback[]
  }

  // Goal management
  async createGoal(goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Goal> {
    const goal = await blink.db.goals.create({
      ...goalData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    return goal as Goal
  }

  async getUserGoals(userId: string): Promise<Goal[]> {
    const goals = await blink.db.goals.list({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
    return goals as Goal[]
  }

  async updateGoal(goalId: string, updates: Partial<Goal>): Promise<Goal> {
    await blink.db.goals.update(goalId, {
      ...updates,
      updatedAt: new Date().toISOString()
    })
    const goals = await blink.db.goals.list({
      where: { id: goalId },
      limit: 1
    })
    return goals[0] as Goal
  }

  // Analytics management
  async createAnalytics(analyticsData: Omit<Analytics, 'id' | 'createdAt'>): Promise<Analytics> {
    const analytics = await blink.db.analytics.create({
      ...analyticsData,
      createdAt: new Date().toISOString()
    })
    return analytics as Analytics
  }

  async getAnalytics(filters: {
    userId?: string
    teamId?: string
    period: 'daily' | 'weekly' | 'monthly'
    startDate: string
    endDate: string
  }): Promise<Analytics[]> {
    const where: any = {
      period: filters.period,
      AND: [
        { date: { gte: filters.startDate } },
        { date: { lte: filters.endDate } }
      ]
    }

    if (filters.userId) where.userId = filters.userId
    if (filters.teamId) where.teamId = filters.teamId

    const analytics = await blink.db.analytics.list({
      where,
      orderBy: { date: 'desc' }
    })
    return analytics as Analytics[]
  }
}

// Singleton instance
export const db = new DatabaseManager()