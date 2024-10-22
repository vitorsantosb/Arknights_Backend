import { faker } from '@faker-js/faker';
import { CreateHashPassword } from '@security/encryption-utils';
import { CreateId } from '@configs/uuid/GenUUID';
import { CreateUserDto } from '@repository/dto/user.dto';
import { StoreUser } from '@repository/user.repository';
import { ApiLogMessage } from '@configs/logs/logMessages';
import * as fs from 'fs';
import * as path from 'path';

export async function SeedUsers(numberOfUsers: number) {
  ApiLogMessage('[SEEDERS]', `Initialize seed of ${numberOfUsers} users.`); // Registro inicial
  
  const tempDir = path.join(__dirname, 'temp');
  const filePath = path.join(tempDir, 'seeded_users.txt');
  
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  
  let fileContent = `Seed of generated users:\n\n`;
  
  for (let i = 0; i < numberOfUsers; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = '123456';
    
    const hashedPassword = await CreateHashPassword(password);
    const id = CreateId();
    
    const userDto = CreateUserDto(
      id,
      name,
      email,
      hashedPassword
    );
    
    await StoreUser(userDto);
    
    fileContent += `ID: ${id}, Name: ${name}, Email: ${email}\n`;
  }
  
  fs.writeFileSync(filePath, fileContent);
  ApiLogMessage('[SEEDERS]', `Seed of ${numberOfUsers} users has been concluded. File saved on ${filePath}.`); // Registro final
}
