const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const randomCode = require("../../utils/randomCode");
const sendEmail = require("../../utils/sendEmail");

const User = require("../models/User.models");

const nodemailer = require("nodemailer");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { configDotenv } = require("dotenv");
const {
	setTestEmailSend,
	getTestEmailSend,
} = require("../../state/state.data");
configDotenv;

const jwt = require("jsonwebtoken");
const { generateToken } = require("../../utils/token");
const enumOk = require("../../utils/enumOk");
const randomPassword = require("../../utils/randomPassword");

//? -------------------

const registerLargo = async (req, res, next) => {
	let catchImg = req.file?.path; /// el optional chaining es para que no rompa en caso de no haber path

	try {
		await User.syncIndexes();
		let confirmationCode = randomCode();
		const { email, name } = req.body; // lo que enviamos por la parte del body de la request

		const userExist = await User.findOne(
			{ email: req.body.email },
			{ name: req.body.name }
		);

		if (!userExist) {
			const newUser = new User({ ...req.body, confirmationCode });

			if (req.file) {
				newUser.image = req.file.path;
			} else {
				newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
			}

			try {
				const userSave = await newUser.save();

				if (userSave) {
					const emailEnv = process.env.EMAIL;
					const password = process.env.PASSWORD;

					const transporter = nodemailer.createTransport({
						service: "gmail",
						auth: {
							user: emailEnv,
							pass: password,
						},
					});

					const mailOptions = {
						from: emailEnv,
						to: email,
						subject: "Confirmation code",
						text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
					};

					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
							return res.status(404).json({
								user: userSave,
								confirmationCode: "error, resend code",
							});
						}
						console.log("Email sent: " + info.response);
						return res.status(200).json({
							user: userSave,
							confirmationCode,
						});
					});
				}
			} catch (error) {
				return res.status(404).json(error.message);
			}
		} else {
			if (req.file) deleteImgCloudinary(catchImg);
			return res.status(409).json("this user already exist");
		}
	} catch (error) {
		if (req.file) deleteImgCloudinary(catchImg);
		return next(error);
	}
};

//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER CORTO EN CODIGO ------------------------
//! -----------------------------------------------------------------------------

const register = async (req, res, next) => {
	let catchImg = req.file?.path;
	try {
		await User.syncIndexes();
		let confirmationCode = randomCode();
		const { email, name } = req.body;

		const userExist = await User.findOne(
			{ email: req.body.email },
			{ name: req.body.name }
		);

		if (!userExist) {
			const newUser = new User({ ...req.body, confirmationCode });
			if (req.file) {
				newUser.image = req.file.path;
			} else {
				newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
			}

			try {
				const userSave = await newUser.save();

				if (userSave) {
					sendEmail(email, name, confirmationCode);
					setTimeout(() => {
						if (getTestEmailSend()) {
							setTestEmailSend(false);
							return res.status(200).json({
								user: userSave,
								confirmationCode,
							});
						} else {
							setTestEmailSend(false);
							return res.status(404).json({
								user: userSave,
								confirmationCode: "error, resend code",
							});
						}
					}, 1100);
				}
			} catch (error) {
				return res.status(404).json(error.message);
			}
		} else {
			if (req.file) deleteImgCloudinary(catchImg);
			return res.status(409).json("this user already exist");
		}
	} catch (error) {
		if (req.file) deleteImgCloudinary(catchImg);
		return next(error);
	}
};

//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER CON REDIRECT----------------------------
//! -----------------------------------------------------------------------------

const registerWithRedirect = async (req, res, next) => {
	let catchImg = req.file?.path;
	try {
		await User.syncIndexes();
		let confirmationCode = randomCode();
		const userExist = await User.findOne(
			{ email: req.body.email },
			{ name: req.body.name }
		);
		if (!userExist) {
			const newUser = new User({ ...req.body, confirmationCode });
			if (req.file) {
				newUser.image = req.file.path;
			} else {
				newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
			}

			try {
				const userSave = await newUser.save();
				const PORT = process.env.PORT;
				if (userSave) {
					return res.redirect(
						307,
						`http://localhost:${PORT}/api/v1/users/register/sendMail/${userSave._id}`
					);
				}
			} catch (error) {
				return res.status(404).json(error.message);
			}
		} else {
			if (req.file) deleteImgCloudinary(catchImg);
			return res.status(409).json("this user already exist");
		}
	} catch (error) {
		if (req.file) {
			deleteImgCloudinary(catchImg);
		}
		return next(error);
	}
};
//! -----------------------------------------------------------------------------
//? ----------------------------LÓGICA PARA MANDAR CÓDIGO -----------------------
//! -----------------------------------------------------------------------------

const sendCode = async (req, res, next) => {
	try {
		const { id } = req.params;

		const userDB = await User.findById(id);

		const emailEnv = process.env.EMAIL;
		const password = process.env.PASSWORD;

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: emailEnv,
				pass: password,
			},
		});

		const mailOptions = {
			from: emailEnv,
			to: userDB.email,
			subject: "Confirmation code",
			text: `tu codigo es ${userDB.confirmationCode}, gracias por confiar en nosotros ${userDB.name}`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
				return res.status(404).json({
					user: userDB,
					confirmationCode: "error, resend code",
				});
			}
			console.log("Email sent: " + info.response);
			return res.status(200).json({
				user: userDB,
				confirmationCode: userDB.confirmationCode,
			});
		});
	} catch (error) {
		return next(error);
	}
};

//! -----------------------------------------------------------------------------
//? ---------------------------------- RESEND CODE -----------------------------
//! -----------------------------------------------------------------------------

const resendCode = async (req, res, next) => {
	try {
		//! vamos a configurar nodemailer porque tenemos que enviar un codigo
		const email = process.env.EMAIL;
		const password = process.env.PASSWORD;
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: email,
				pass: password,
			},
		});
		//! hay que ver que el usuario exista porque si no existe no tiene sentido hacer ninguna verificacion
		const userExists = await User.findOne({ email: req.body.email });

		if (userExists) {
			const mailOptions = {
				from: email,
				to: req.body.email,
				subject: "Confirmation code",
				text: `tu codigo es ${userExists.confirmationCode}`,
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
					return res.status(404).json({
						resend: false,
					});
				} else {
					console.log("Email sent: " + info.response);
					return res.status(200).json({
						resend: true,
					});
				}
			});
		} else {
			return res.status(404).json("User not found");
		}
	} catch (error) {
		return next(setError(500, error.message || "Error general send code"));
	}
};

//! ------------------------------------------------------------------------
//? -------------------------- CHECK NEW USER------------------------------
//! ------------------------------------------------------------------------

const checkNewUser = async (req, res, next) => {
	try {
		//! nos traemos de la req.body el email y codigo de confirmation
		const { email, confirmationCode } = req.body;

		const userExists = await User.findOne({ email });

		if (!userExists) {
			//!No existe----> 404 de no se encuentra
			return res.status(404).json("User not found");
		} else {
			// cogemos que comparamos que el codigo que recibimos por la req.body y el del userExists es igual
			if (confirmationCode === userExists.confirmationCode) {
				try {
					await userExists.updateOne({ check: true });

					// hacemos un testeo de que este user se ha actualizado correctamente, hacemos un findOne
					const updateUser = await User.findOne({ email });

					// este finOne nos sirve para hacer un ternario que nos diga si la propiedad vale true o false
					return res.status(200).json({
						testCheckOk: updateUser.check == true ? true : false,
					});
				} catch (error) {
					return res.status(404).json(error.message);
				}
			} else {
				try {
					/// En caso dec equivocarse con el codigo lo borramos de la base datos y lo mandamos al registro
					await User.findByIdAndDelete(userExists._id);

					// borramos la imagen
					deleteImgCloudinary(userExists.image);

					// devolvemos un 200 con el test de ver si el delete se ha hecho correctamente
					return res.status(200).json({
						userExists,
						check: false,

						// test en el runtime sobre la eliminacion de este user
						delete: (await User.findById(userExists._id))
							? "error delete user"
							: "ok delete user",
					});
				} catch (error) {
					return res
						.status(404)
						.json(error.message || "error general delete user");
				}
			}
		}
	} catch (error) {
		// siempre en el catch devolvemos un 500 con el error general
		return next(setError(500, error.message || "General error check code"));
	}
};

//! -----------------------------------------------------------------------------
//? ---------------------------- INICIAR SESIÓN ---------------------------------
//! -----------------------------------------------------------------------------

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userDB = await User.findOne({ email });

		if (userDB) {
			if (bcrypt.compareSync(password, userDB.password)) {
				const token = generateToken(userDB._id, email);
				return res.status(200).json({
					user: userDB,
					token,
				});
			} else {
				return res.status(404).json("password dont match");
			}
		} else {
			return res.status(404).json("User no register");
		}
	} catch (error) {
		return next(error);
	}
};

//! -----------------------------------------------------------------------------
//? ---------------------------- AUTO LOGIN  ---------------------------------
//! -----------------------------------------------------------------------------

const autoLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userDB = await User.findOne({ email });

		if (userDB) {
			if (password == userDB.password) {
				const token = generateToken(userDB._id, email);
				return res.status(200).json({
					user: userDB,
					token,
				});
			} else {
				return res.status(404).json("password dont match");
			}
		} else {
			return res.status(404).json("User no register");
		}
	} catch (error) {
		return next(error);
	}
};

//! -----------------------------------------------------------------------------
//? ---------------------------- CHANGE PASSWORD  ---------------------------------
//! -----------------------------------------------------------------------------

const changePassword = async (req, res, next) => {
	try {
		const { email } = req.body;
		console.log(req.body);
		const userDb = await User.findOne({ email });
		if (userDb) {
			const PORT = process.env.PORT;
			return res.redirect(
				307,
				`http://localhost:${PORT}/api/v1/users/sendPassword/${userDb._id}`
			);
		} else {
			return res.status(404).json("User no register");
		}
	} catch (error) {
		return next(error);
	}
};

const sendPassword = async (req, res, next) => {
	try {
		/** VAMOS A BUSCAR AL USER POOR EL ID DEL PARAM */
		const { id } = req.params;
		const userDb = await User.findById(id);
		const email = process.env.EMAIL;
		const password = process.env.PASSWORD;
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: email,
				pass: password,
			},
		});
		let passwordSecure = randomPassword();
		console.log(passwordSecure);
		const mailOptions = {
			from: email,
			to: userDb.email,
			subject: "-----",
			text: `User: ${userDb.name}. Your new code login is ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido ponte en contacto con nosotros, gracias.`,
		};
		transporter.sendMail(mailOptions, async function (error, info) {
			if (error) {
				/// SI HAY UN ERROR MANDO UN 404
				console.log(error);
				return res.status(404).json("dont send email and dont update user");
			} else {
				// SI NO HAY NINGUN ERROR
				console.log("Email sent: " + info.response);
				///guardamos esta contraseña en mongo db

				/// 1 ) encriptamos la contraseña
				const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);

				try {
					/** este metodo te lo busca por id y luego modifica las claves que le digas
					 * en este caso le decimos que en la parte dde password queremos meter
					 * la contraseña hasheada
					 */
					await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });

					//!------------------ test --------------------------------------------
					// vuelvo a buscar el user pero ya actualizado
					const userUpdatePassword = await User.findById(id);

					// hago un compare sync ----> comparo una contraseña no encriptada con una encrptada
					/// -----> userUpdatePassword.password ----> encriptada
					/// -----> passwordSecure -----> contraseña no encriptada
					if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
						// si son iguales quiere decir que el back se ha actualizado correctamente
						return res.status(200).json({
							updateUser: true,
							sendPassword: true,
						});
					} else {
						/** si no son iguales le diremos que hemos enviado el correo pero que no
						 * hemos actualizado el user del back en mongo db
						 */
						return res.status(404).json({
							updateUser: false,
							sendPassword: true,
						});
					}
				} catch (error) {
					return res.status(404).json(error.message);
				}
			}
		});
	} catch (error) {
		return next(error);
	}
};

const modifyPassword = async (req, res, next) => {
	/** IMPORTANTE ---> REQ.USER ----> LO CREAR LOS AUTH MIDDLEWARE */
	console.log("req.user", req.user);

	try {
		const { password, newPassword } = req.body;
		const { _id } = req.user;

		/** comparamos la contrasela vieja sin encriptar y la encriptada */
		if (bcrypt.compareSync(password, req.user.password)) {
			/** tenemos que encriptar la contraseña para poder guardarla en el back mongo db */
			const newPasswordHashed = bcrypt.hashSync(newPassword, 10);

			/** vamos a actualizar la contraseña en mongo db */
			try {
				await User.findByIdAndUpdate(_id, { password: newPasswordHashed });

				/** TESTING EN TIEMPO REAL  */

				//1) Traemos el user actualizado
				const userUpdate = await User.findById(_id);

				// 2) vamos a comparar la contraseña sin encriptar y la tenemos en el back que esta encriptada
				if (bcrypt.compareSync(newPassword, userUpdate.password)) {
					/// SI SON IGUALES 200 ---> UPDATE OK
					return res.status(200).json({
						updateUser: true,
					});
				} else {
					///NO SON IGUALES -------> 404 no son iguales
					return res.status(404).json({
						updateUser: false,
					});
				}
			} catch (error) {
				return res.status(404).json(error.message);
			}
		} else {
			/** si las contraseñas no son iguales le mando un 404 diciendo que las contraseñas no son iguales */
			return res.status(404).json("password dont match");
		}
	} catch (error) {
		return next(error);
		/**
	   * return next(
		setError(
		  500,
		  error.message || 'Error general to ChangePassword with AUTH'
		)
	  );
	   */
	}
};

//! -----------------------------------------------------------------------------
//? ---------------------------- UPDATE  ---------------------------------
//! -----------------------------------------------------------------------------

const update = async (req, res, next) => {
	let catchImg = req.file?.path;

	try {
		await User.syncIndexes();
		const patchUser = new User(req.body);
		req.file && (patchUser.image = catchImg);
		patchUser._id = req.user._id;
		patchUser.password = req.user.password;
		patchUser.rol = req.user.rol;
		patchUser.confirmationCode = req.user.confirmationCode;
		patchUser.email = req.user.email;
		patchUser.check = req.user.check;

		if (req.body?.gender) {
			const resultEnum = enumOk(req.body?.gender);
			patchUser.gender = resultEnum.check ? req.body?.gender : req.user.gender;
		}

		try {
			await User.findByIdAndUpdate(req.user._id, patchUser);
			if (req.file) deleteImgCloudinary(req.user.image);
			const updateUser = await User.findById(req.user._id);
			const updateKeys = Object.keys(req.body);
			const testUpdate = [];

			updateKeys.forEach((item) => {
				if (updateUser[item] === req.body[item]) {
					if (updateUser[item] != req.user[item]) {
						testUpdate.push({
							[item]: true,
						});
					} else {
						testUpdate.push({
							[item]: "sameOldInfo",
						});
					}
				} else {
					testUpdate.push({
						[item]: false,
					});
				}
			});

			if (req.file) {
				updateUser.image === catchImg
					? testUpdate.push({
							image: true,
					  })
					: testUpdate.push({
							image: false,
					  });
			}
			return res.status(200).json({
				updateUser,
				testUpdate,
			});
		} catch (error) {
			if (req.file) deleteImgCloudinary(catchImg);
			return res.status(404).json(error.message);
		}
	} catch (error) {
		if (req.file) deleteImgCloudinary(catchImg);
		return next(error);
	}
};

//! -----------------------------------------------------------------------------
//? ---------------------------------DELETE--------------------------------------
//! -----------------------------------------------------------------------------

const deleteUser = async (req, res, next) => {
	try {
		const { _id, image } = req.user;
		await User.findByIdAndDelete(_id);
		if (await User.findById(_id)) {
			// si el usuario
			return res.status(404).json("not deleted"); ///
		} else {
			deleteImgCloudinary(image);
			return res.status(200).json("ok delete");
		}
	} catch (error) {
		return next(error);
	}
};

//? ---------------------------- EXPORTS ---------------------------------

module.exports = {
	registerLargo,
	register,
	sendCode,
	registerWithRedirect,
	login,
	autoLogin,
	resendCode,
	checkNewUser,
	sendPassword,
	changePassword,
	modifyPassword,
	update,
	deleteUser,
};
