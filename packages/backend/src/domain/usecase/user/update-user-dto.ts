export interface InputUpdateUserDto {
  id: string
  username?: string
}

export interface InputUpdatePasswordDto {
  id: string
  currentPassword: string
  newPassword: string
}

export interface OutputUpdateUserDto {
  id: string
  username: string
}
